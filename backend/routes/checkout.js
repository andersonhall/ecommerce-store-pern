import express from "express";
import { checkout } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/:cartId", checkout);

export default router;
