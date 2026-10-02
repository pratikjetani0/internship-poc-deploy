import { useMutation } from "@tanstack/react-query";
import { authApi } from "./auth.api";
import { storage } from "@/lib/auth/storage";
import { getApiErrorMessage } from "@/lib/api/error";
import { useAuthStore } from "@/stores/auth.store";
import type { LoginPayload, RegisterPayload } from "../types/auth.types";
import { toastService } from "@/lib/services/toast.service";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),

    onSuccess: (response) => {
      storage.setAccessToken(response.accessToken);
      setUser(response.user);
      toastService.success("Login successful");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to login"));
    },
  });
}

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),

    onSuccess: (response) => {
      storage.setAccessToken(response.accessToken);
      setUser(response.user);
      toastService.success("Registration successful");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to register"));
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      logout();
      toastService.success("Logged out successfully");
    },

    onError: (error) => {
      toastService.error(getApiErrorMessage(error, "Unable to logout"));
    },
  });
}
