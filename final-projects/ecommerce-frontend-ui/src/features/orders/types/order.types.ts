export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "CANCELLED"
  | "SHIPPED"
  | "DELIVERED";

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type PaginatedOrders = {
  items: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type OrderQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: "createdAt" | "totalAmount" | "status";
  sortOrder?: "ASC" | "DESC";
};

export type UpdateOrderStatusPayload = {
  status: OrderStatus;
};
