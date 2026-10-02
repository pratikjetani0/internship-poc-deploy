import { DashboardDomain } from '../domain/dashboard.domain';
import { DashboardResponseDto } from '../dto/dashboard-response.dto';

export class AdminMapper {
  static toResponse(domain: DashboardDomain): DashboardResponseDto {
    return {
      totalUsers: domain.totalUsers,
      totalProducts: domain.totalProducts,
      totalOrders: domain.totalOrders,
      totalRevenue: domain.totalRevenue,
      pendingOrders: domain.pendingOrders,
      paidOrders: domain.paidOrders,
    };
  }
}
