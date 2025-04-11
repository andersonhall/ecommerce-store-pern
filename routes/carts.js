import express from "express";
import {
  getCartByUserId,
  createCart,
  addToCart,
  removeFromCart,
  deleteCart,
} from "../db/controllers/cartsController.js";

const router = express.Router();

router.get("/:userId", getCartByUserId);
router.post("/", createCart);
router.delete("/:cartId/:productId", removeFromCart);
router.post("/:cartId/:productId", addToCart);
router.delete("/:cartId", deleteCart);

export default router;
