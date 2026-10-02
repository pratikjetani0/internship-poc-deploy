import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orderApi } from "./order.api";
import { orderKeys } from "./order.queries";
import type { OrderStatus } from "../types/order.types";

import { getApiErrorMessage } from "@/lib/api/error";
import { toastService } from "@/lib/services/toast.service";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      orderApi.updateOrderStatus(id, status),

    onSuccess: (updatedOrder) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      toastService.success(
        `Order status updated to ${updatedOrder.status}`,
      );
    },

    onError: (error) => {
      toastService.error(
        getApiErrorMessage(error, "Failed to update order status"),
      );
    },
  });
}
