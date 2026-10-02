import { ApiProperty } from '@nestjs/swagger';

export class CartItemResponseDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  productName!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty({ required: false })
  stock?: number;

  @ApiProperty({ required: false })
  slug?: string;

  @ApiProperty({ required: false })
  category?: string;
}

export class CartResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({
    type: [CartItemResponseDto],
  })
  items!: CartItemResponseDto[];

  @ApiProperty()
  totalAmount!: number;
}
