import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './infrastructure/entities/payment.entity';
import { OrdersModule } from '../orders/orders.module';
import { CartModule } from '../cart/cart.module';
import { PaymentController } from './controllers/payment.controller';
import { PaymentRepository } from './infrastructure/repositories/payment.repository';
import { PaymentService } from './services/payment.service';
import { RabbitMQModule } from '../../rabbitmq/rabbitmq.module';
import { UserModule } from '../user/user.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity]),
    OrdersModule,
    CartModule,
    RabbitMQModule,
    UserModule,
    ProductsModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentRepository, PaymentService],
  exports: [PaymentRepository, PaymentService],
})
export class PaymentsModule {}
