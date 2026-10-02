import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  cartKeys,
} from "./cart.api";
import type {
  AddToCartPayload,
  UpdateCartItemPayload,
} from "../types/cart.types";

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCart(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.detail(),
      });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      payload,
    }: {
      productId: string;
      payload: UpdateCartItemPayload;
    }) => updateCartItem(productId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.detail(),
      });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => removeCartItem(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.detail(),
      });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartKeys.detail(),
      });
    },
  });
}
