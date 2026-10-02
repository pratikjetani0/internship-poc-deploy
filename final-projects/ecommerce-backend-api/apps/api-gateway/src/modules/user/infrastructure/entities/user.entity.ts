import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@app/database';
import { Role } from '@app/common';
import { OrderEntity } from '../../../orders/infrastructure/entities/order.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    length: 100,
  })
  name!: string;

  @Column({
    unique: true,
    length: 255,
  })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  hashedRefreshToken?: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role!: Role;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders?: OrderEntity;
}
