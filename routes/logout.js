import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  req.logout(() => {
    console.log(req.session);
    res.json({ message: "Logout successful" });
  });
});

export default router;
