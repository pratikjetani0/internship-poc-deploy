import { api } from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type {
  CheckoutResult,
  Payment,
  PaymentMethod,
} from "../types/payment.types";

export const paymentApi = {
  getPayments: async (): Promise<Payment[]> => {
    const { data } = await api.get<Payment[]>(ENDPOINTS.PAYMENTS);
    return data;
  },

  getPaymentById: async (id: string): Promise<Payment> => {
    const { data } = await api.get<Payment>(`${ENDPOINTS.PAYMENTS}/${id}`);
    return data;
  },

  checkout: async (method: PaymentMethod): Promise<CheckoutResult> => {
    const { data } = await api.post<CheckoutResult>(
      `${ENDPOINTS.PAYMENTS}/checkout`,
      { method },
    );
    return data;
  },
};
