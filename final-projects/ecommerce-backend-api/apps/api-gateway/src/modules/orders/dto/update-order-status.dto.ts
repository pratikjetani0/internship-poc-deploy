import { IsEnum } from 'class-validator';
import { OrderStatus } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderStatusDto {
  @ApiProperty({ example: 'PAID' })
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
