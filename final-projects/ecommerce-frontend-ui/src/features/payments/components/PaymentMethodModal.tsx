import { useState } from "react";
import {
  AlertTriangle,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "../types/payment.types";

interface PaymentMethodModalProps {
  isOpen: boolean;
  totalAmount: number;
  onConfirm: (method: PaymentMethod) => void;
  onClose: () => void;
  isProcessing: boolean;
  error?: string | null;
}

export default function PaymentMethodModal({
  isOpen,
  totalAmount,
  onConfirm,
  onClose,
  isProcessing,
  error = null,
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );

  const handleSelectMethod = (id: PaymentMethod) => () => {
    if (!isProcessing) {
      setSelectedMethod(id);
    }
  };

  const methods = [
    {
      id: "CARD" as const,
      name: "Credit / Debit Card",
      description: "Pay securely with Visa, Mastercard, or RuPay.",
      icon: CreditCard,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      activeBorder: "border-blue-500",
      activeBg: "bg-blue-500/5",
    },
    {
      id: "UPI" as const,
      name: "UPI (GPay, PhonePe, Paytm)",
      description: "Instant payment using any UPI app.",
      icon: Smartphone,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      activeBorder: "border-purple-500",
      activeBg: "bg-purple-500/5",
    },
    {
      id: "COD" as const,
      name: "Cash on Delivery",
      description: "Pay with cash when your order arrives.",
      icon: Banknote,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      activeBorder: "border-emerald-500",
      activeBg: "bg-emerald-500/5",
    },
  ];

  const handleConfirm = () => {
    if (selectedMethod) {
      onConfirm(selectedMethod);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[425px] p-0 overflow-hidden border-border/60 rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50"
        >
          <X className="size-5" />
        </button>

        <div className="p-6 pb-4 bg-muted/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              Secure Checkout
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm pt-1">
              Select a payment method to complete your order.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex items-center justify-between bg-background p-4 rounded-2xl border border-border/60 shadow-xs">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Total Amount
              </span>
            </div>
            <span className="text-2xl font-black text-primary">
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;

            return (
              <button
                key={method.id}
                type="button"
                onClick={handleSelectMethod(method.id)}
                disabled={isProcessing}
                className={cn(
                  "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                  isSelected
                    ? `${method.activeBorder} ${method.activeBg} shadow-sm ring-4 ring-primary/5`
                    : "border-transparent bg-muted/40 hover:bg-muted/60",
                )}
              >
                <div
                  className={cn(
                    "p-2.5 rounded-xl shrink-0 transition-colors",
                    isSelected ? "bg-background shadow-xs" : method.bg,
                  )}
                >
                  <Icon className={cn("size-5", method.color)} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-foreground">
                      {method.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="size-4 text-primary animate-in zoom-in-50 duration-200" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 pr-4">
                    {method.description}
                  </p>
                </div>
              </button>
            );
          })}

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs font-semibold text-destructive">
              <AlertTriangle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="p-6 pt-2">
          <Button
            onClick={handleConfirm}
            disabled={!selectedMethod || isProcessing}
            className="w-full h-12 rounded-xl font-bold shadow-md hover:shadow-lg transition-all gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <span>Confirm & Pay ₹{totalAmount.toLocaleString()}</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
