import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type { Cart } from "../types/cart.types";
import { getCartTotals } from "../utils/cart.utils";
import { toastService } from "@/lib/services/toast.service";

export type CartSummaryCardProps = {
  cart?: Cart | null;
  onCheckout?: () => void;
  isCheckingOut?: boolean;
};

export default function CartSummaryCard({
  cart,
  onCheckout,
  isCheckingOut = false,
}: CartSummaryCardProps) {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const { totalItems, subtotal, shipping, discount, total } =
    getCartTotals(cart);

  const freeShippingThreshold = 1000;
  const isFreeShipping = subtotal >= freeShippingThreshold || shipping === 0;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      toastService.error("Please enter a valid promo code.");
      return;
    }

    if (promoCode.trim().toUpperCase() === "WELCOME10") {
      setAppliedPromo("WELCOME10 (10% OFF applied at checkout)");
      toastService.success("Promo code applied successfully!");
    } else {
      toastService.error("Invalid or expired promo code.");
    }
  };

  const handleCheckoutClick = () => {
    if (totalItems === 0) {
      toastService.error("Your cart is currently empty.");
      return;
    }
    if (onCheckout) {
      onCheckout();
    } else {
      toastService.success("Proceeding to secure checkout!");
    }
  };

  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 p-6 sm:p-7 shadow-xl backdrop-blur-md space-y-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ShoppingBag className="size-5 text-primary" />
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">
            Order Summary
          </h2>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Free shipping banner */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-foreground/90 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Truck className="size-4" />
          <span>
            {isFreeShipping && amountForFreeShipping === 0
              ? "Free Shipping Qualified!"
              : `Add ₹${amountForFreeShipping.toLocaleString("en-IN")} for Free Shipping`}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{
              width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
            }}
          />
        </div>
      </div>

      <Separator className="bg-border/60" />

      {/* Promo Code Box */}
      <form onSubmit={handleApplyPromo} className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Promo Code
        </span>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. WELCOME10"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="h-10 rounded-xl bg-background/80 text-xs font-semibold uppercase tracking-wider"
            disabled={!!appliedPromo}
          />
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            className="h-10 px-4 rounded-xl font-bold text-xs"
            disabled={!!appliedPromo || !promoCode.trim()}
          >
            Apply
          </Button>
        </div>
        {appliedPromo && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-3.5" />
            <span>{appliedPromo}</span>
          </div>
        )}
      </form>

      <Separator className="bg-border/60" />

      {/* Cost Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground font-medium">
          <span>Subtotal</span>
          <span className="font-bold text-foreground">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-muted-foreground font-medium">
          <span>Shipping & Handling</span>
          <span className="font-bold text-foreground">
            {shipping === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">
                FREE
              </span>
            ) : (
              `₹${shipping.toLocaleString("en-IN")}`
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="flex items-center gap-1">
              <Sparkles className="size-3.5" /> Discount
            </span>
            <span className="font-bold">-₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}

        <Separator className="bg-border/60 pt-1" />

        <div className="flex justify-between items-baseline pt-2">
          <span className="text-base font-extrabold text-foreground">
            Estimated Total
          </span>
          <div className="text-right">
            <span className="text-2xl font-black text-primary">
              ₹{total.toLocaleString("en-IN")}
            </span>
            <span className="block text-[10px] uppercase font-bold text-muted-foreground">
              Taxes included
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        size="lg"
        onClick={handleCheckoutClick}
        disabled={totalItems === 0 || isCheckingOut}
        className="w-full rounded-2xl bg-primary py-6 text-base font-extrabold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {isCheckingOut ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            <span>Placing Your Order...</span>
          </>
        ) : (
          <>
            <span>Proceed to Checkout</span>
            <ArrowRight className="size-5" />
          </>
        )}
      </Button>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/40 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary shrink-0" />
          <span>256-Bit SSL Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="size-4 text-primary shrink-0" />
          <span>30-Day Easy Returns Guarantee</span>
        </div>
      </div>
    </div>
  );
}
