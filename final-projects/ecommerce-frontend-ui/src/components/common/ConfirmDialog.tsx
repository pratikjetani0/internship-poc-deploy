import * as React from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export type ConfirmDialogProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export default function ConfirmDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  isLoading: externalLoading = false,
  icon,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const loading = externalLoading || isConfirming;

  const handleConfirmClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setIsConfirming(true);
      await onConfirm();
      handleOpenChange(false);
    } catch {
      // If error occurs, keep dialog open or let caller handle toast
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      )}

      <AlertDialogContent className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md p-6 shadow-2xl max-w-sm">
        <AlertDialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-2.5">
            {icon && (
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-xl border p-1.5 shadow-sm",
                  variant === "destructive"
                    ? "border-destructive/20 bg-destructive/10 text-destructive"
                    : "border-primary/20 bg-primary/10 text-primary",
                )}
              >
                {icon}
              </div>
            )}
            <AlertDialogTitle className="text-lg font-bold tracking-tight text-foreground">
              {title}
            </AlertDialogTitle>
          </div>

          {description && (
            <AlertDialogDescription className="text-sm leading-normal text-muted-foreground">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-2.5">
          <AlertDialogCancel
            disabled={loading}
            className="rounded-xl border-border/60 bg-background hover:bg-muted/60 font-semibold text-xs sm:text-sm h-10 px-4"
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirmClick}
            disabled={loading}
            className={cn(
              "rounded-xl font-bold text-xs sm:text-sm h-10 px-5 flex items-center justify-center gap-2 shadow-sm transition-all",
              variant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            <span>{loading ? "Please wait..." : confirmText}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
