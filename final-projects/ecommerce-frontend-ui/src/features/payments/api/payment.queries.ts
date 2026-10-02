import { useQuery } from "@tanstack/react-query";
import { paymentApi } from "./payment.api";

export const paymentKeys = {
  all: ["payments"] as const,
  lists: () => [...paymentKeys.all, "list"] as const,
  details: () => [...paymentKeys.all, "detail"] as const,
  detail: (id: string) => [...paymentKeys.details(), id] as const,
};

export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.lists(),
    queryFn: () => paymentApi.getPayments(),
  });
}

export function usePayment(id: string | undefined) {
  return useQuery({
    queryKey: paymentKeys.detail(id!),
    queryFn: () => paymentApi.getPaymentById(id!),
    enabled: !!id,
  });
}
