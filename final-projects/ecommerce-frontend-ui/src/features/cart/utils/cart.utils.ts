import type { Cart, CartItem } from "../types/cart.types";

export function getCartItemDetails(item: CartItem) {
  const name = item.productName || item.product?.name || "Product";
  const price = Number(item.price ?? item.product?.price ?? item.unitPrice ?? 0);
  const image =
    item.image || item.product?.images?.[0] || "/placeholder-product.png";
  const stock = Number(item.stock ?? item.product?.stock ?? 99);
  const slug = item.slug || item.product?.slug || "";
  const category = item.category || item.product?.category || "General";
  const subtotal = price * item.quantity;

  return {
    name,
    price,
    image,
    stock,
    slug,
    category,
    subtotal,
  };
}

export function getCartTotals(cart?: Cart | null) {
  const items = cart?.items || [];
  const totalItems =
    items.reduce((acc, i) => acc + i.quantity, 0) || cart?.totalItems || 0;

  const calculatedSubtotal = items.reduce((acc, i) => {
    const details = getCartItemDetails(i);
    return acc + details.subtotal;
  }, 0);

  const subtotal = Number(
    cart?.totalAmount ?? cart?.subtotal ?? calculatedSubtotal,
  );
  const shipping = Number(cart?.shipping ?? 0);
  const discount = Number(cart?.discount ?? 0);
  const total = Number(
    cart?.totalAmount ?? cart?.total ?? subtotal + shipping - discount,
  );

  return {
    items,
    totalItems,
    subtotal,
    shipping,
    discount,
    total,
  };
}
