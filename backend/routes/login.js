import passport from "passport";
import { Router } from "express";
const router = Router();
import "../config/passportConfig.js";
import db from "../config/dbConfig.js";

router.post("/", passport.authenticate("local"), async (req, res) => {
  const fetchCart = await db
    .query("SELECT * FROM cart WHERE user_id = $1", [req.user])
    .then((cart) => cart.rows[0])
    .catch((err) => console.log(err));
  const cart = fetchCart;
  if (cart) {
    const fetchItems = await db
      .query("SELECT * FROM cart_item WHERE cart_id = $1", [cart.id])
      .then((items) => items.rows)
      .catch((err) => console.log(err));
    const items = fetchItems;
    req.session.cart = { cart, items };
    return res
      .status(200)
      .json({ message: "Login successful", cart: req.session.cart });
  }

  res.status(200).json({ message: "Login successful" });
});

export default router;
