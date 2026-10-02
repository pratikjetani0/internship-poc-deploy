import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/infrastructure/entities/user.entity';
import { ProductEntity } from '../products/infrastructure/entities/product.entity';
import { OrderEntity } from '../orders/infrastructure/entities/order.entity';
import { AdminController } from './controllers/admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { AdminService } from './services/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity, OrderEntity])],
  controllers: [AdminController],
  providers: [AdminRepository, AdminService],
})
export class AdminModule {}
