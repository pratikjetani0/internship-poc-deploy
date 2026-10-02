import { ApiProperty } from '@nestjs/swagger';

import { ProductResponseDto } from './product-response.dto';
import { Type } from 'class-transformer';

export class PaginatedProductsResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  items!: ProductResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  @Type(() => Number)
  page!: number;

  @ApiProperty()
  @Type(() => Number)
  limit!: number;

  @ApiProperty()
  totalPages!: number;
}
