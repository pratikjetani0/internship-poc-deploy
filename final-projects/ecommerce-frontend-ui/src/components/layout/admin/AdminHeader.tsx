import { Moon, PanelLeft, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/app/providers";
import { ROUTES, ROUTE_META } from "@/app/router/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth.store";
import { useLogout } from "@/features/auth/api/auth.mutations";

export default function AdminHeader() {
  const { toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const title =
    ROUTE_META[location.pathname as keyof typeof ROUTE_META]?.title ??
    "Dashboard";

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-8">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <PanelLeft className="size-5" />
        </Button>

        <h1 className="text-lg font-semibold capitalize">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto rounded-full p-0">
                <Avatar>
                  <AvatarFallback>{user.name?.charAt(0) || "A"}</AvatarFallback>
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

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer rounded-lg text-destructive focus:text-destructive font-semibold"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
