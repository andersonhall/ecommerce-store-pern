import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logout successful" });
  });
});

export default router;
