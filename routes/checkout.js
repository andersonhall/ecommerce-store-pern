import express from "express";
import { checkout } from "../db/controllers/checkoutController.js";

const router = express.Router();

router.post("/:cartId", checkout);

export default router;
