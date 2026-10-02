import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { notificationApi } from "./notification.api";
import type { Notification } from "../types/notification.types";
import { useAuthStore } from "@/stores/auth.store";

export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  details: () => [...notificationKeys.all, "detail"] as const,
  detail: (id: string) => [...notificationKeys.details(), id] as const,
};

export function useNotifications(
  options?: Omit<UseQueryOptions<Notification[]>, "queryKey" | "queryFn">,
) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: () => notificationApi.getNotifications(),
    enabled: isAuthenticated,
    refetchInterval: 30000, // Refetch every 30 seconds for new notifications
    ...options,
  });
}

export function useNotification(
  id: string,
  options?: Omit<UseQueryOptions<Notification>, "queryKey" | "queryFn">,
) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: notificationKeys.detail(id),
    queryFn: () => notificationApi.getNotificationById(id),
    enabled: isAuthenticated && !!id,
    ...options,
  });
}
