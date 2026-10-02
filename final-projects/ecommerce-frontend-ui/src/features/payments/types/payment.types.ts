import type { Order } from "@/features/orders";

export type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";

export type PaymentMethod = "CARD" | "UPI" | "COD";

export type Payment = {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};

export type CheckoutResult = {
  order: Order;
  payment: Payment;
};
