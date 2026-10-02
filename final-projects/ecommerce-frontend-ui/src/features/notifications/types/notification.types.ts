export type NotificationType =
  | "USER_REGISTERED"
  | "ORDER_CREATED"
  | "PAYMENT_SUCCESS";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
