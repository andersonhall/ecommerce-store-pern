import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import db from "../config/dbConfig.js";

router.post("/", async (req, res) => {
  try {
    const { username, password, first_name, last_name } = req.body;
    if (!username || !password || !first_name || !last_name) {
      throw Error("Please fill out all fields");
    }
    const findExistingUser = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const existingUser = findExistingUser.rows[0];
    if (existingUser) {
      throw Error("Username already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userToInsert = await db.query(
      "INSERT INTO users (username, password, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, now()) RETURNING id, username",
      [username, hashedPassword, first_name, last_name]
    );
    const user = userToInsert.rows[0];
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
    });
    res.status(201).json({ message: "User registered.", user: req.user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
