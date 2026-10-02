import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "@/layouts/AuthLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

import RoleLayout from "./RoleLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { Role } from "@/types/role";
import AdminProductsPage from "@/features/products/pages/AdminProductsPage";
import CustomerProductsPage from "@/features/products/pages/CustomerProductsPage.tsx";
import ProductFormPage from "@/features/products/pages/ProductFormPage";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";
import CartPage from "@/features/cart/pages/CartPage";
import CheckoutPage from "@/features/cart/pages/CheckoutPage";
import AdminRoute from "./AdminRoute";
import { AdminUsersPage } from "@/features/user";
import { AdminOrdersPage, CustomerOrdersPage } from "@/features/orders";
import { AdminPaymentsPage } from "@/features/payments";
import { NotificationsPage } from "@/features/notifications";
import { useAuthStore } from "@/stores/auth.store";

export default function AppRouter() {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === Role.ADMIN;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          </Route>
        </Route>

        <Route element={<RoleLayout />}>
          {/* Publicly Accessible Routes */}
          <Route
            path={ROUTES.HOME}
            element={
              isAdmin ? (
                <Navigate to={ROUTES.DASHBOARD} replace />
              ) : (
                <CustomerProductsPage />
              )
            }
          />
          <Route
            path={ROUTES.PRODUCTS}
            element={
              isAdmin ? (
                <AdminProductsPage />
              ) : (
                <CustomerProductsPage />
              )
            }
          />
          <Route
            path={ROUTES.PRODUCT_DETAILS}
            element={<ProductDetailsPage />}
          />

          {/* Protected (Authenticated Only) Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path={ROUTES.ORDERS}
              element={isAdmin ? <AdminOrdersPage /> : <CustomerOrdersPage />}
            />
            <Route element={<AdminRoute />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.USERS} element={<AdminUsersPage />} />
              <Route path={ROUTES.PAYMENTS} element={<AdminPaymentsPage />} />
              <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />
              <Route
                path={ROUTES.PRODUCT_CREATE}
                element={<ProductFormPage mode="create" />}
              />

              <Route
                path={ROUTES.PRODUCT_EDIT}
                element={<ProductFormPage mode="edit" />}
              />
            </Route>
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
