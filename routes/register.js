import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import db from "../db/config.js";

router.post("/", async (req, res) => {
  try {
    const { username, password, first_name, last_name } = req.body;
    if (!username || !password || !first_name || !last_name) {
      throw Error("Please fill out all fields");
    }
    const existingUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (existingUser.rows.length > 0) {
      throw Error("Username already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.query(
      "INSERT INTO users (username, password, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, now()) RETURNING id, username",
      [username, hashedPassword, first_name, last_name]
    );
    req.login(user.rows[0], (err) => {
      if (err) {
        return next(err);
      }
    });
    console.log(req.user);
    res.status(201).json({ message: "User registered." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
