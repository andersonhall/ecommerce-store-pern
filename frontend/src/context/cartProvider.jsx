import { useState, useEffect, useContext } from "react";
import { CartContext } from "./cartContext";
import { AuthContext } from "./authContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async (user) => {
      await fetch(`http://localhost:3000/carts/${user}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCart(data);
        });
    };
    fetchCart(user);
  }, [user]);

  const value = {
    cart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
