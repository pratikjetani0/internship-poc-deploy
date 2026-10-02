import { Moon, ShoppingCart, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import { useTheme } from "@/app/providers";

import AppLogo from "@/components/layout/shared/AppLogo";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/auth.store";
import { useCart } from "@/features/cart/api/cart.queries";
import { getCartTotals } from "@/features/cart/utils/cart.utils";
import { useLogout } from "@/features/auth/api/auth.mutations";
import { toastService } from "@/lib/services/toast.service";
import { NotificationBell } from "@/features/notifications";

export default function CustomerHeader() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuthStore();
  const { data: cart } = useCart();
  const { totalItems: cartCount } = getCartTotals(cart);
  const logoutMutation = useLogout();

  const handleCartClick = (e: React.MouseEvent) => {
    if (!isAuthenticated || !user) {
      e.preventDefault();
      toastService.info("Please log in to view your shopping cart.");
      navigate(ROUTES.LOGIN);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to={ROUTES.HOME}>
          <AppLogo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleCartClick}
            asChild
          >
            <Link to={ROUTES.CART}>
              <ShoppingCart className="size-5" />

              {isAuthenticated && cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>

          {isAuthenticated && user ? (
            <>
              <NotificationBell />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto rounded-full p-0">
                    <Avatar>
                      <AvatarFallback>
                        {user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  <div className="flex flex-col space-y-0.5 p-2 border-b border-border/40 text-xs">
                    <span className="font-bold truncate text-foreground">
                      {user.name}
                    </span>
                    <span className="text-muted-foreground truncate">
                      {user.email}
                    </span>
                  </div>

                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg mt-1">
                    <Link to={ROUTES.PROFILE}>Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                    <Link to={ROUTES.ORDERS}>Orders</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="cursor-pointer rounded-lg text-destructive focus:text-destructive font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                asChild
                className="rounded-full font-semibold text-xs sm:text-sm"
              >
                <Link to={ROUTES.LOGIN}>Log In</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
