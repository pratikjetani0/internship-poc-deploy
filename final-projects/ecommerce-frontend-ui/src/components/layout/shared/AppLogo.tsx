import { ScanSearch } from "lucide-react";

type AppLogoProps = {
  collapsed?: boolean;
};

export default function AppLogo({ collapsed = false }: AppLogoProps) {
  return (
    <div
      className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-sm">
        <ScanSearch className="size-5" strokeWidth={2.5} />
      </div>

      {!collapsed && (
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold tracking-tight">Scopio</h2>

          <p className="text-xs text-muted-foreground">Shop with scope</p>
        </div>
      )}
    </div>
  );
}
