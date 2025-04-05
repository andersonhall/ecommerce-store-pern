import passport from "passport";
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("login");
});

router.post("/", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful" });
});

export default router;
