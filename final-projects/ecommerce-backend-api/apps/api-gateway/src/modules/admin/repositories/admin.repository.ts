import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../user/infrastructure/entities/user.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../products/infrastructure/entities/product.entity';
import { OrderEntity } from '../../orders/infrastructure/entities/order.entity';
import { DashboardDomain } from '../domain/dashboard.domain';
import { OrderStatus } from '@app/common';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  //GET DASHBOARD
  async getDashboard(): Promise<DashboardDomain> {
    const [totalUsers, totalProducts, orderStats] = await Promise.all([
      this.userRepository.count(),

      this.productRepository.count(),

      this.orderRepository
        .createQueryBuilder('order')
        .select('COUNT(*)', 'totalOrders')
        .addSelect(
          `SUM(CASE WHEN order.status = :pendingStatus THEN 1 ELSE 0 END)`,
          'pendingOrders',
        )
        .addSelect(
          `SUM(CASE WHEN order.status = :paidStatus THEN 1 ELSE 0 END)`,
          'paidOrders',
        )
        .addSelect(
          `SUM(CASE WHEN order.status = :paidStatus THEN order.totalAmount ELSE 0 END)`,
          'totalRevenue',
        )
        .setParameters({
          pendingStatus: OrderStatus.PENDING,
          paidStatus: OrderStatus.PAID,
        })
        .getRawOne<{
          totalOrders: string;
          pendingOrders: string;
          paidOrders: string;
          totalRevenue: string | null;
        }>(),
    ]);

    return new DashboardDomain({
      totalUsers,
      totalProducts,
      totalOrders: Number(orderStats?.totalOrders ?? 0),
      pendingOrders: Number(orderStats?.pendingOrders ?? 0),
      paidOrders: Number(orderStats?.paidOrders ?? 0),
      totalRevenue: Number(orderStats?.totalRevenue ?? 0),
    });
  }
}
