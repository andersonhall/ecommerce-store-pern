import passport from "passport";
import { Router } from "express";
const router = Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("here");
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message }); // Send info message to client
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

export default router;
