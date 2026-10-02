import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentApi } from "./payment.api";
import { paymentKeys } from "./payment.queries";
import { orderKeys } from "@/features/orders/api/order.queries";
import { cartKeys } from "@/features/cart";
import type { PaymentMethod } from "../types/payment.types";
import { getApiErrorMessage } from "@/lib/api/error";
import { toastService } from "@/lib/services/toast.service";

const onSuccessInvalidations = (queryClient: ReturnType<typeof useQueryClient>) => {
  // refetch everything a payment touches
  queryClient.invalidateQueries({ queryKey: paymentKeys.all });
  queryClient.invalidateQueries({ queryKey: orderKeys.all });
  queryClient.invalidateQueries({ queryKey: cartKeys.all });
  // give the notification service a moment to process the event
  setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }, 1000);
};

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (method: PaymentMethod) => paymentApi.checkout(method),
    onSuccess: () => {
      toastService.success("Payment processed successfully!");
      onSuccessInvalidations(queryClient);
    },
    onError: (error) => {
      toastService.error(
        getApiErrorMessage(error, "Failed to process payment. Please try again."),
      );
    },
  });
}


