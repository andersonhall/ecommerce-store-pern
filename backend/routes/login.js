import passport from "passport";
import { Router } from "express";
const router = Router();
import "../config/passportConfig.js";

router.post("/", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Login successful" });
});

export default router;
