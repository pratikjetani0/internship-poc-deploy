import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { userApi } from "./user.api";
import type { User, PaginatedUsers, UserQuery } from "../types/user.types";

export const userKeys = {
  all: ["users"] as const,
  me: () => ["users", "me"] as const,
  list: (params?: UserQuery) => ["users", "list", params] as const,
  detail: (id: string) => ["users", "detail", id] as const,
};

export function useCurrentUser(
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userApi.getCurrentUser,
    ...options,
  });
}

export function useUsers(
  params?: UserQuery,
  options?: Omit<UseQueryOptions<PaginatedUsers>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.getUsers(params),
    ...options,
  });
}

export function useUser(
  id: string,
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
    ...options,
  });
}
