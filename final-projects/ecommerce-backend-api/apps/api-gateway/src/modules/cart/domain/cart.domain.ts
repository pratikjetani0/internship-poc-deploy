export type CartItemDomain = {
  id?: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
  stock?: number;
  slug?: string;
  category?: string;
};

export type CartDomainProps = {
  id?: string;
  userId: string;
  items: CartItemDomain[];
};

export class CartDomain {
  id?: string;
  userId: string;
  items: CartItemDomain[];

  constructor(props: CartDomainProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.items = props.items;
  }

  getTotalAmount(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
