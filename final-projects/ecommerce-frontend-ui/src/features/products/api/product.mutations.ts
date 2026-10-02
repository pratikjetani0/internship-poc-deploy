import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "./product.api";
import { productKeys } from "./product.queries";
import { toastService } from "@/lib/services/toast.service";
import { getApiErrorMessage } from "@/lib/api/error";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      toastService.success("Product created successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to create product"));
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Parameters<typeof productApi.update>[1];
    }) => productApi.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      toastService.success("Product updated successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to update product"));
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      toastService.success("Product deleted successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to delete product"));
    },
  });
}
