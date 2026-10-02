import { Outlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/admin";
import AdminHeader from "@/components/layout/admin/AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <AdminHeader />
          <main className="flex-1 p-6">

          <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
