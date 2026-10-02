import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { orderApi } from "./order.api";
import type { Order, PaginatedOrders, OrderQuery } from "../types/order.types";

export const orderKeys = {
  all: ["orders"] as const,
  list: (params?: OrderQuery) => ["orders", "list", params] as const,
  detail: (id: string) => ["orders", "detail", id] as const,
};

export function useOrders(
  params?: OrderQuery,
  options?: Omit<UseQueryOptions<PaginatedOrders>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: orderKeys.list(params),
    queryFn: () => orderApi.getOrders(params),
    ...options,
  });
}

export function useOrder(
  id: string,
  options?: Omit<UseQueryOptions<Order>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
    ...options,
  });
}
