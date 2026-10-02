import { OrderStatus } from '@app/common';

export type OrderItemDomain = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type OrderDomainProps = {
  id?: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItemDomain[];
  createdAt?: Date;
  updatedAt?: Date;
};

export class OrderDomain {
  id?: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItemDomain[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: OrderDomainProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.totalAmount = props.totalAmount;
    this.status = props.status;
    this.items = props.items;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  isPaid(): boolean {
    return this.status === OrderStatus.PAID;
  }

  isCancelled(): boolean {
    return this.status === OrderStatus.CANCELLED;
  }
}
