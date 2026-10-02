import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from '../infrastructure/repositories/order.repository';
import { CartRepository } from '../../cart/infrastructure/repositories/cart.repository';
import { UserRepository } from '../../user/infrastructure/repositories/user.repository';
import { OrderMapper } from '../mappers/order.mapper';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { OrderStatus, Role } from '@app/common';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,

    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
  ) {}

  //CREATE ORDER
  async createOrder(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = await this.cartRepository.findCartByUserId(userId);

    if (!cart) {
      throw new BadRequestException('Cart not found');
    }

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = await this.orderRepository.createOrder(userId, cart);

    this.notificationClient
      .emit('order_created', {
        userId,
        orderId: order.id,
        email: user.email,
        name: user.name,
        amount: order.totalAmount,
      })
      .subscribe();

    await this.cartRepository.clearCart(userId);

    return OrderMapper.toResponse(order);
  }

  //GET ORDERS
  async getOrders(user: JwtPayload) {
    const orders =
      user.role === Role.ADMIN
        ? await this.orderRepository.findAll()
        : await this.orderRepository.findByUserId(user.sub);

    // Customers should only see orders whose payment is completed (no pending)
    const visibleOrders =
      user.role === Role.ADMIN
        ? orders
        : orders.filter((order) => order.status !== OrderStatus.PENDING);

    return visibleOrders.map((order) => OrderMapper.toResponse(order));
  }

  //GET ORDERS BY ID
  async getOrderById(user: JwtPayload, orderId: string) {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (user.role !== Role.ADMIN && order.userId !== user.sub) {
      throw new NotFoundException('Order not found');
    }

    return OrderMapper.toResponse(order);
  }

  //UPDATE ORDER STATUS
  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.orderRepository.updateStatus(orderId, dto.status);

    return OrderMapper.toResponse(order);
  }
}
