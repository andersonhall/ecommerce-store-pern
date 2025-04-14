import "./CartCounter.css";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

const CartCounter = () => {
  const { getCartQuantity } = useContext(CartContext);
  const cartQuantity = getCartQuantity();

  return <p className="cart-counter">Cart: {cartQuantity}</p>;
};

export default CartCounter;
