import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./routes";
import { Role } from "@/types/role";
import { useAuthStore } from "@/stores/auth.store";

export default function AdminRoute() {
    const user = useAuthStore((state) => state.user);

    if (user?.role !== Role.ADMIN) {
        return <Navigate to={ ROUTES.HOME } replace />;
    }

    return <Outlet />;
}