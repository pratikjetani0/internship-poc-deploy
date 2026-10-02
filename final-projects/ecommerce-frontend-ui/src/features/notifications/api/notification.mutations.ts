import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "./notification.api";
import { notificationKeys } from "./notification.queries";
import { toastService } from "@/lib/services/toast.service";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: () => {
      toastService.error("Failed to mark notification as read.");
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toastService.success("All notifications marked as read.");
    },
    onError: () => {
      toastService.error("Failed to mark all notifications as read.");
    },
  });
}
