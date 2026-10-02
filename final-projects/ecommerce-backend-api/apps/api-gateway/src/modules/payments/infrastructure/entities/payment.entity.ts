import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { OrderEntity } from '../../../orders/infrastructure/entities/order.entity';
import { PaymentMethod, PaymentStatus } from '@app/common';
import { BaseEntity } from '@app/database';

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @OneToOne(() => OrderEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  order!: OrderEntity;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.COD })
  method!: PaymentMethod;

  @Column({ unique: true, length: 100 })
  transactionId!: string;
}
