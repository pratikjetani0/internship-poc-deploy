import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './infrastructure/entities/order.entity';
import { OrderItemEntity } from './infrastructure/entities/order-item.entity';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';
import { ProductsModule } from '../products/products.module';
import { OrderRepository } from './infrastructure/repositories/order.repository';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    CartModule,
    UserModule,
    ProductsModule,
    RabbitMQModule,
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  exports: [OrderRepository, OrderService],
})
export class OrdersModule {}
