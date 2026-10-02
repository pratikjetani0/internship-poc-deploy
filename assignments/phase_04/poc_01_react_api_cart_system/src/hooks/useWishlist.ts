import { useState } from "react";
import type { Product } from "../types";
import { loadWishlist, saveWishlist } from "../utils/wishlistStorage";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>(loadWishlist());

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    const updatedWishlist = exists
      ? wishlist.filter((item) => item.id !== product.id)
      : [...wishlist, product];

    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
  };

  return { wishlist, toggleWishlist };
};

export default useWishlist;
