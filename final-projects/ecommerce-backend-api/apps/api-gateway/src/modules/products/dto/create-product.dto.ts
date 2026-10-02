import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 16 Pro' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Latest Apple flagship' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 129999 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    type: [String],
    example: ['https://example.com/front.jpg', 'https://example.com/back.jpg'],
  })
  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty({ example: 'Mobiles' })
  @IsString()
  category!: string;

  @ApiPropertyOptional({
    example: {
      Display: '6.7 inch',
      RAM: '8 GB',
      Storage: '256 GB',
    },
  })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, unknown>;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
