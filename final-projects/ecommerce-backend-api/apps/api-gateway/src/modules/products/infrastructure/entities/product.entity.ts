import { BaseEntity } from '@app/database';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItemEntity } from '../../../orders/infrastructure/entities/order-item.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @Column({ length: 255 })
  name!: string;

  @Column({ unique: true, length: 255 })
  slug!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column('text', { array: true, default: () => "'{}'" })
  images!: string[];

  @Column({ default: 0 })
  stock!: number;

  @Column({ length: 100 })
  category!: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  specifications!: Record<string, unknown>;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => OrderItemEntity, (item) => item.product)
  orderItems?: OrderItemEntity[];
}
