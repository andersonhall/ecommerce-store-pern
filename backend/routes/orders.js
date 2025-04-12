import express from "express";
import {
  getOrdersByUserId,
  getOrderById,
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/:orderId", getOrderById);
router.get("/user/:userId", getOrdersByUserId);

export default router;
