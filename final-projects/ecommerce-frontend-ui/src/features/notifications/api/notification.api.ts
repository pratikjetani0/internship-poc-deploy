import { api } from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Notification } from "../types/notification.types";

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await api.get<Notification[]>(ENDPOINTS.NOTIFICATIONS);
    return data;
  },

  getNotificationById: async (id: string): Promise<Notification> => {
    const { data } = await api.get<Notification>(
      `${ENDPOINTS.NOTIFICATIONS}/${id}`,
    );
    return data;
  },

  markAsRead: async (id: string): Promise<Notification> => {
    const { data } = await api.patch<Notification>(
      `${ENDPOINTS.NOTIFICATIONS}/${id}/read`,
    );
    return data;
  },

  markAllAsRead: async (): Promise<{ message: string }> => {
    const { data } = await api.patch<{ message: string }>(
      `${ENDPOINTS.NOTIFICATIONS}/read-all`,
    );
    return data;
  },
};
