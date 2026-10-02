import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { Role } from "@/types/role";
import { ROUTES } from "./routes";

export default function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  if (isAuthenticated) {
    const targetRoute = user?.role === Role.ADMIN ? ROUTES.DASHBOARD : ROUTES.HOME;
    return <Navigate to={targetRoute} replace />;
  }

  return <Outlet />;
}
