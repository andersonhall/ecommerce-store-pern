import { useState, useEffect, useContext } from "react";
import { CartContext } from "./cartContext";
import { AuthContext } from "./authContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchCart = async (user) => {
        await fetch(`http://localhost:3000/carts/${user}`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setCart(data.cart);
          });
      };
      fetchCart(user);
    }
  }, [user]);

  const getCartQuantity = () => {
    if (cart) {
      let cartQuantity = 0;
      for (let item of cart) {
        cartQuantity += item.quantity;
      }
      return cartQuantity;
    }
  };
  const value = {
    cart,
    getCartQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
