import { PaymentMethod, PaymentStatus } from '@app/common';

export type PaymentDomainProps = {
  id?: string;
  userId: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class PaymentDomain {
  id?: string;
  userId: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: PaymentDomainProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.orderId = props.orderId;
    this.amount = props.amount;
    this.status = props.status;
    this.method = props.method;
    this.transactionId = props.transactionId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
