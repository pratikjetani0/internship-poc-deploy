import { Module } from '@nestjs/common';
import { CartEntity } from './infrastructure/entities/cart.entity';
import { CartItemEntity } from './infrastructure/entities/cart-item.entity';
import { ProductsModule } from '../products/products.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './controllers/cart.controller';
import { CartRepository } from './infrastructure/repositories/cart.repository';
import { CartService } from './services/cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    ProductsModule,
    UserModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export class CartModule {}
