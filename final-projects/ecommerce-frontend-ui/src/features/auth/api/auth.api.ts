import { api } from "@/lib/api/axios";
import { ENDPOINTS } from "@/lib/api/endpoints";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";

export const authApi = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      `${ENDPOINTS.AUTH}/login`,
      payload,
    );

    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      `${ENDPOINTS.AUTH}/register`,
      payload,
    );

    return data;
  },

  async refresh(): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(`${ENDPOINTS.AUTH}/refresh`);

    return data;
  },

  async logout(): Promise<void> {
    await api.post(`${ENDPOINTS.AUTH}/logout`);
  },
};
