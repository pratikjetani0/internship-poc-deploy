import { Outlet } from "react-router-dom";

import CustomerHeader from "@/components/layout/customer/CustomerHeader";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-background">
      <CustomerHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
