import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { storage } from "@/lib/auth/storage";
import { ROUTES } from "@/app/router/routes";
import { ENDPOINTS } from "@/lib/api/endpoints";

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export function setupInterceptors(api: AxiosInstance) {
  let isRefreshing = false;
  let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token as string);
      }
    });
    failedQueue = [];
  };

  api.interceptors.request.use((config) => {
    const token = storage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
      const originalRequest = error.config as RetriableConfig;
      const isAuthUrl =
        originalRequest?.url?.includes("/auth/login") ||
        originalRequest?.url?.includes("/auth/register") ||
        originalRequest?.url?.includes("/auth/refresh");
      const hasToken = !!storage.getAccessToken();

      if (error.response?.status === 401 && !isAuthUrl && hasToken && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await api.post(`${ENDPOINTS.AUTH}/refresh`);

          if (data.accessToken) {
            storage.setAccessToken(data.accessToken);
            processQueue(null, data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          } else {
            throw new Error("No access token returned");
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          storage.clear();
          window.location.replace(ROUTES.LOGIN);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response?.status === 401 && !isAuthUrl && hasToken) {
        storage.clear();
        window.location.replace(ROUTES.LOGIN);
      }

      return Promise.reject(error);
    },
  );
}
