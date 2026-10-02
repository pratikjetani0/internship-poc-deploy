import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import LoadingScreen from "@/components/feedback/LoadingScreen";
import { useAuthStore } from "@/stores/auth.store";

export default function ProtectedRoute() {
  const { isAuthenticated, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
