import { api } from "@/lib/api/axios";
import type {
  AddToCartPayload,
  Cart,
  UpdateCartItemPayload,
} from "../types/cart.types";

export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"] as const,
};

export async function getCart() {
  const { data } = await api.get<Cart>("/cart");
  return data;
}

export async function addToCart(payload: AddToCartPayload) {
  const { data } = await api.post<Cart>("/cart/items", payload);
  return data;
}

export async function updateCartItem(
  productId: string,
  payload: UpdateCartItemPayload,
) {
  const { data } = await api.patch<Cart>(`/cart/items/${productId}`, payload);

  return data;
}

export async function removeCartItem(productId: string) {
  await api.delete(`/cart/items/${productId}`);
}

export async function clearCart() {
  await api.delete("/cart/clear");
}
