import { BaseEntity } from '@app/database';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';
import { CartItemEntity } from './cart-item.entity';

@Entity('carts')
export class CartEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user!: UserEntity;

  @OneToMany(() => CartItemEntity, (item) => item.cart, { cascade: true })
  items!: CartItemEntity[];
}
