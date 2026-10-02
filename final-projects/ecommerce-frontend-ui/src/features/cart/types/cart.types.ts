export type CartItem = {
  id?: string;
  productId: string;
  productName?: string;
  price?: number;
  image?: string;
  stock?: number;
  slug?: string;
  category?: string;
  product?: {
    id: string;
    slug: string;
    name: string;
    category: string;
    images: string[];
    price: number;
    stock: number;
    isActive: boolean;
  };
  quantity: number;
  unitPrice?: number;
  subtotal?: number;
};

export type Cart = {
  id?: string;
  userId?: string;
  items?: CartItem[];
  totalAmount?: number;
  totalItems?: number;
  subtotal?: number;
  shipping?: number;
  discount?: number;
  total?: number;
};

export type AddToCartPayload = {
  productId: string;
  quantity: number;
};

export type UpdateCartItemPayload = {
  quantity: number;
};
