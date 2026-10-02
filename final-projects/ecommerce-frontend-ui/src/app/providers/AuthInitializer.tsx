import { type PropsWithChildren, useEffect } from "react";

import { storage } from "@/lib/auth/storage";
import { useAuthStore } from "@/stores/auth.store";
import { useCurrentUser } from "@/features/user";

type AuthInitializerProps = PropsWithChildren;

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const initialize = useAuthStore((state) => state.initialize);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const token = storage.getAccessToken();

  const { data, isSuccess, isError } = useCurrentUser({
    enabled: !!token,
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess, setUser]);

  useEffect(() => {
    if (isError) {
      logout();
    }
  }, [isError, logout]);

  return children;
}
