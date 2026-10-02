import { useState } from "react";
import type { CartItem, Product } from "../types";
import { loadCart, saveCart } from "../utils/cartStorage";

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(loadCart());

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    saveCart(updatedCart);
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedCart = [...cart, { product, quantity: 1 }];
    }

    updateCart(updatedCart);
  };

  const increaseQuantity = (id: number) => {
    updateCart(
      cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    updateCart(
      cart
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const deleteItem = (id: number) => {
    updateCart(cart.filter((item) => item.product.id !== id));
  };

  return {
    cart,
    handleAddToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
  };
};

export default useCart;
