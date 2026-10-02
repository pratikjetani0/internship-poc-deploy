import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@app/common';
import { IsEnum, IsOptional } from 'class-validator';

export class ProcessPaymentDto {
  @ApiProperty({ enum: PaymentMethod, default: PaymentMethod.COD })
  @IsOptional()
  @IsEnum(PaymentMethod)
  method!: PaymentMethod;
}
