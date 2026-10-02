import { ApiProperty } from '@nestjs/swagger';

export class DashboardResponseDto {
  @ApiProperty()
  totalUsers!: number;

  @ApiProperty()
  totalProducts!: number;

  @ApiProperty()
  totalOrders!: number;

  @ApiProperty()
  totalRevenue!: number;

  @ApiProperty()
  pendingOrders!: number;

  @ApiProperty()
  paidOrders!: number;
}
