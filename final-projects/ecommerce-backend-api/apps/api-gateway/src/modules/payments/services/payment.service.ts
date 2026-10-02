import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentRepository } from '../infrastructure/repositories/payment.repository';
import { OrderRepository } from '../../orders/infrastructure/repositories/order.repository';
import { CartRepository } from '../../cart/infrastructure/repositories/cart.repository';
import { OrderStatus, PaymentMethod, Role } from '@app/common';
import { PaymentMapper } from '../mappers/payment.mapper';
import { OrderMapper } from '../../orders/mappers/order.mapper';
import { ClientProxy } from '@nestjs/microservices';
import { UserRepository } from '../../user/infrastructure/repositories/user.repository';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ProductRepository } from '../../products/infrastructure/repositories/product.repository';

type StockItem = {
  productId: string;
  quantity: number;
  productName?: string;
};

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly orderRepository: OrderRepository,
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,

    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  // create the order and take the payment in the same request
  async checkout(userId: string, method: PaymentMethod) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    await this.validateStock(cart.items);

    const order = await this.orderRepository.createOrder(
      userId,
      cart,
      OrderStatus.PAID,
    );

    const payment = await this.paymentRepository.processPayment(
      order.id!,
      order.totalAmount,
      method,
    );

    await this.cartRepository.clearCart(userId);

    await this.decrementStockForItems(cart.items);

    try {
      this.notificationClient
        .emit('order_created', {
          userId,
          orderId: order.id,
          email: user.email,
          name: user.name,
          amount: order.totalAmount,
        })
        .subscribe();
    } catch (error) {
      console.error('RabbitMQ Error', error);
    }

    try {
      this.notificationClient
        .emit('payment_success', {
          userId,
          paymentId: payment.id,
          orderId: order.id,
          amount: payment.amount,
          email: user.email,
          name: user.name,
        })
        .subscribe();
    } catch (error) {
      console.error('RabbitMQ Error', error);
    }

    return {
      order: OrderMapper.toResponse(order),
      payment: PaymentMapper.toResponse(payment),
    };
  }

  //PROCESS PAYMENT
  async processPayment(orderId: string, method: PaymentMethod) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status === OrderStatus.PAID) {
      throw new BadRequestException('Order already paid');
    }

    const existingPayment = await this.paymentRepository.findByOrderId(orderId);

    if (existingPayment) {
      throw new BadRequestException('Payment already exists');
    }

    await this.validateStock(order.items);

    const payment = await this.paymentRepository.processPayment(
      orderId,
      order.totalAmount,
      method,
    );

    await this.orderRepository.updateStatus(orderId, OrderStatus.PAID);

    await this.decrementStockForItems(order.items);

    const user = await this.userRepository.findById(order.userId);

    try {
      if (user) {
        this.notificationClient
          .emit('payment_success', {
            userId: user.id,
            paymentId: payment.id,
            orderId,
            amount: payment.amount,
            email: user.email,
            name: user.name,
          })
          .subscribe();
      }
    } catch (error) {
      console.error('RabbitMQ Error', error);
    }

    return PaymentMapper.toResponse(payment);
  }

  // make sure everything is still in stock before taking the money
  private async validateStock(items: StockItem[]): Promise<void> {
    for (const item of items) {
      const hasStock = await this.productRepository.hasStock(
        item.productId,
        item.quantity,
      );

      if (!hasStock) {
        throw new BadRequestException(
          `Insufficient stock for ${item.productName ?? 'one of the products in your order'}.`,
        );
      }
    }
  }

  //DECREMENT STOCK AFTER PAYMENT SUCCESS
  private async decrementStockForItems(items: StockItem[]): Promise<void> {
    for (const item of items) {
      await this.productRepository.decrementStock(
        item.productId,
        item.quantity,
      );
    }
  }

  // GET MY PAYMENTS
  async getPayments(user: JwtPayload) {
    const payments =
      user.role === Role.ADMIN
        ? await this.paymentRepository.findAll()
        : await this.paymentRepository.findByUserId(user.sub);

    return payments.map((payment) => PaymentMapper.toResponse(payment));
  }

  // GET PAYMENT DETAILS
  async getPaymentById(user: JwtPayload, paymentId: string) {
    const payment = await this.paymentRepository.findById(paymentId);

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (user.role !== Role.ADMIN && payment.userId !== user.sub) {
      throw new NotFoundException('Payment not found');
    }

    return PaymentMapper.toResponse(payment);
  }
}
