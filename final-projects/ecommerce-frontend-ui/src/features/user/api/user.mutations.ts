import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "./user.api";
import { userKeys } from "./user.queries";
import type { UserRole } from "../types/user.types";

import { getApiErrorMessage } from "@/lib/api/error";
import { toastService } from "@/lib/services/toast.service";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });

      toastService.success("Profile updated");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to update profile"));
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      userApi.updateUserRole(id, role),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toastService.success("User role updated successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to update user role"));
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      userApi.updateUserStatus(id, isActive),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toastService.success("User status updated successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to update user status"));
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      toastService.success("User deleted successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to delete user"));
    },
  });
}
