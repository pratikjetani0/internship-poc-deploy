import { Route, Routes } from "react-router-dom";
import type { CartItem, Product } from "../types";
import Layout from "../Layout";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import PageNotFound from "../pages/PageNotFound";

interface AppRoutesProps {
  cart: CartItem[];
  wishlist: Product[];
  onAddToCart: (product: Product) => void;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleWishlist: (product: Product) => void;
}

const AppRoutes = ({
  cart,
  wishlist,
  onAddToCart,
  onIncrease,
  onDecrease,
  onDelete,
  onToggleWishlist,
}: AppRoutesProps) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout cart={cart} wishlist={wishlist} />}>
          <Route
            index
            element={
              <HomePage
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartPage
                cart={cart}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onDelete={onDelete}
              />
            }
          />
          <Route
            path="wishlist"
            element={<WishlistPage wishlist={wishlist} />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
