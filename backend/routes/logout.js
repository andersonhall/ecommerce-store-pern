import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res
      .status(200)
      .clearCookie("connect.sid")
      .json({ message: "Logout successful" });
  });
});

export default router;
