import { BaseEntity } from '@app/database';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../../../user/infrastructure/entities/user.entity';
import { OrderStatus } from '@app/common';
import { OrderItemEntity } from './order-item.entity';
import { PaymentEntity } from '../../../payments/infrastructure/entities/payment.entity';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { nullable: false })
  user!: UserEntity;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items!: OrderItemEntity[];

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  payment?: PaymentEntity;
}
