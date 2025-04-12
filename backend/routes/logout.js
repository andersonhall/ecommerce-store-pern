import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logout successful" });
  });
});

export default router;
