import { useQuery } from "@tanstack/react-query";
import { cartKeys, getCart } from "./cart.api";
import { useAuthStore } from "@/stores/auth.store";

export function useCart() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: getCart,
    enabled: isAuthenticated,
  });
}
