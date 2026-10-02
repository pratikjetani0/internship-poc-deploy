import { ROUTES } from "@/app/router/routes";
import { Package, ShoppingCart, Receipt, User } from "lucide-react";

export const customerNavigation = [
  {
    label: "Products",
    href: ROUTES.PRODUCTS,
    icon: Package,
  },
  {
    label: "Cart",
    href: ROUTES.CART,
    icon: ShoppingCart,
  },
  {
    label: "Orders",
    href: ROUTES.ORDERS,
    icon: Receipt,
  },
  {
    label: "Profile",
    href: ROUTES.PROFILE,
    icon: User,
  },
];
