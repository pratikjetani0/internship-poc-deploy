import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrastructure/entities/product.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { ProductRepository } from './infrastructure/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export class ProductsModule {}
