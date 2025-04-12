import passport from "passport";
import { Router } from "express";
const router = Router();
import "../config/passportConfig.js";

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    req.login(user, next);
    res.status(200).json({ message: "Login successful" });
  })(req, res, next);
});

export default router;
