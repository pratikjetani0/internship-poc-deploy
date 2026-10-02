import AdminLayout from "@/layouts/AdminLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useAuthStore } from "@/stores/auth.store";
import { Role } from "@/types/role";


export default function RoleLayout() {
  // Temporary
  const role = useAuthStore((state) => state.user?.role);
  
  if (role === Role.ADMIN) {
    return <AdminLayout />;
  }

  return <CustomerLayout />;
}
