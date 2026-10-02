import { useEffect, type PropsWithChildren } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "./ThemeProvider";
import QueryProvider from "./QueryProvider";
import { useAuthStore } from "@/stores/auth.store";
import AuthInitializer from "./AuthInitializer";

export default function AppProvider({ children }: PropsWithChildren) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider delayDuration={200}>
          <AuthInitializer>{children}</AuthInitializer>

          <Toaster richColors position="top-center" />
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
