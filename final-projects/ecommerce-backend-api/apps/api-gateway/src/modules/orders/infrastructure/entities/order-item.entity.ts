import { BaseEntity } from '@app/database';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../../products/infrastructure/entities/product.entity';

@Entity('order-items')
export class OrderItemEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, { nullable: false })
  product!: ProductEntity;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price!: number;
}
