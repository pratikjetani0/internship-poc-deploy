import { ROUTES } from "@/app/router/routes";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CreditCard,
  Bell,
  Users,
} from "lucide-react";

export const adminNavigation = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: ROUTES.PRODUCTS,
    icon: Package,
  },
  {
    label: "Users",
    href: ROUTES.USERS,
    icon: Users,
  },
  {
    label: "Orders",
    href: ROUTES.ORDERS,
    icon: ShoppingCart,
  },
  {
    label: "Payments",
    href: ROUTES.PAYMENTS,
    icon: CreditCard,
  },
  {
    label: "Notifications",
    href: ROUTES.NOTIFICATIONS,
    icon: Bell,
  },
];
