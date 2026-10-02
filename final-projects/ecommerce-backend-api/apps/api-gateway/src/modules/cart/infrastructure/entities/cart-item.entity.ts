import { BaseEntity } from '@app/database';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CartEntity } from './cart.entity';
import { ProductEntity } from '../../../products/infrastructure/entities/product.entity';

@Entity('cart-items')
export class CartItemEntity extends BaseEntity {
  @ManyToOne(() => CartEntity, (cart) => cart.items)
  cart!: CartEntity;

  @ManyToOne(() => ProductEntity)
  product!: ProductEntity;

  @Column()
  quantity!: number;
}
