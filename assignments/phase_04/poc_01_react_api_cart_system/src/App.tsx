import AppRoutes from "./routes/AppRoutes";
import useWishlist from "./hooks/useWishlist";
import useCart from "./hooks/useCart";

const App = () => {
  const {
    cart,
    handleAddToCart,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
  } = useCart();
  
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <AppRoutes
      cart={cart}
      wishlist={wishlist}
      onAddToCart={handleAddToCart}
      onIncrease={increaseQuantity}
      onDecrease={decreaseQuantity}
      onDelete={deleteItem}
      onToggleWishlist={toggleWishlist}
    />
  );
};

export default App;
