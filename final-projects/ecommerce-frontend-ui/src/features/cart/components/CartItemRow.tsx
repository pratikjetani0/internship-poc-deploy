import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/app/router/routes";
import type { CartItem } from "../types/cart.types";
import { getCartItemDetails } from "../utils/cart.utils";
import { useRemoveCartItem, useUpdateCartItem } from "../api/cart.mutations";
import { toastService } from "@/lib/services/toast.service";

export type CartItemRowProps = {
  item: CartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  const [isUpdatingLocal, setIsUpdatingLocal] = useState(false);
  const { name, price, image, stock, slug, category, subtotal } =
    getCartItemDetails(item);

  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const isPending =
    updateMutation.isPending || removeMutation.isPending || isUpdatingLocal;

  const handleQuantityChange = (newQty: number) => async () => {
    if (newQty < 1) return;
    if (stock > 0 && newQty > stock) {
      toastService.error(`Only ${stock} units available in stock.`);
      return;
    }

    setIsUpdatingLocal(true);
    try {
      await updateMutation.mutateAsync({
        productId: item.productId,
        payload: { quantity: newQty },
      });
      toastService.success(`Updated quantity for ${name}`);
    } catch {
      toastService.error("Failed to update item quantity. Please try again.");
    } finally {
      setIsUpdatingLocal(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdatingLocal(true);
    try {
      await removeMutation.mutateAsync(item.productId);
      toastService.success(`Removed ${name} from cart`);
    } catch {
      toastService.error("Failed to remove item from cart.");
      setIsUpdatingLocal(false);
    }
  };

  return (
    <div className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/60 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-border hover:shadow-lg">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative size-20 sm:size-24 shrink-0 overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-muted/50 to-muted/10 p-2 flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
        </div>

        <div className="flex flex-col space-y-1 min-w-0 flex-1">
          <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {category}
          </span>

          {slug ? (
            <Link
              to={ROUTES.PRODUCT_DETAILS.replace(":slug", slug)}
              className="font-bold text-base sm:text-lg text-foreground truncate hover:text-primary transition-colors"
            >
              {name}
            </Link>
          ) : (
            <span className="font-bold text-base sm:text-lg text-foreground truncate">
              {name}
            </span>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Unit Price:</span>
            <span className="font-semibold text-foreground">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {stock > 0 && stock <= 5 && (
              <span className="text-amber-500 font-medium">
                ({stock} left in stock)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-border/40 pt-3 sm:pt-0">
        {/* Quantity Selector */}
        <div className="flex items-center rounded-xl border border-border/80 bg-background/80 p-1 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-8 rounded-lg hover:bg-muted transition-colors"
            onClick={handleQuantityChange(item.quantity - 1)}
            disabled={isPending || item.quantity <= 1}
          >
            <Minus className="size-3.5" />
          </Button>

          <span className="w-10 text-center text-sm font-bold text-foreground">
            {isPending ? (
              <Loader2 className="size-3.5 animate-spin mx-auto text-primary" />
            ) : (
              item.quantity
            )}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-8 rounded-lg hover:bg-muted transition-colors"
            onClick={handleQuantityChange(item.quantity + 1)}
            disabled={isPending || (stock > 0 && item.quantity >= stock)}
          >
            <Plus className="size-3.5" />
          </Button>
        </div>

        {/* Subtotal & Delete */}
        <div className="flex items-center gap-4 min-w-[110px] justify-end">
          <div className="text-right">
            <span className="block text-xs text-muted-foreground sm:hidden">
              Total
            </span>
            <span className="font-extrabold text-base sm:text-lg text-primary">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleRemove}
            disabled={isPending}
            className="size-9 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            title="Remove item"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
