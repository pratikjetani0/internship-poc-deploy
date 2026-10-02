import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderDomain } from '../../domain/order.domain';
import { OrderMapper } from '../../mappers/order.mapper';
import { OrderStatus } from '@app/common';
import { CartDomain } from '../../../cart/domain/cart.domain';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';
import { ProductEntity } from '../../../products/infrastructure/entities/product.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  // FIND ORDER BY ID
  async findById(orderId: string): Promise<OrderDomain | null> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    return order ? OrderMapper.toDomain(order) : null;
  }

  //FIND USER BY ID
  async findByUserId(userId: string): Promise<OrderDomain[]> {
    const orders = await this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return orders.map((order) => OrderMapper.toDomain(order));
  }

  //CREATE ORDER
  async createOrder(
    userId: string,
    cart: CartDomain,
    status: OrderStatus = OrderStatus.PENDING,
  ): Promise<OrderDomain> {
    const user = new UserEntity();
    user.id = userId;

    const order = this.orderRepository.create({
      user,
      totalAmount: cart.getTotalAmount(),
      status,
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderItems = cart.items.map((item) => {
      const product = new ProductEntity();

      product.id = item.productId;

      return this.orderItemRepository.create({
        order: savedOrder,
        product,
        quantity: item.quantity,
        price: item.price,
      });
    });

    await this.orderItemRepository.save(orderItems);

    const fullOrder = await this.orderRepository.findOneOrFail({
      where: {
        id: savedOrder.id,
      },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    return OrderMapper.toDomain(fullOrder);
  }

  //UPDATE STATUS
  async updateStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<OrderDomain> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;

    await this.orderRepository.save(order);

    return OrderMapper.toDomain(order);
  }

  // GET ALL ORDERS
  async findAll(): Promise<OrderDomain[]> {
    const orders = await this.orderRepository.find({
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return orders.map((order) => OrderMapper.toDomain(order));
  }
}
