import db from "../config.js";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM users");
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await db.query(
      "SELECT id, username, first_name, last_name, created_at, modified_at FROM users WHERE id = $1",
      [id]
    );
    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

// Update user by id
export const updateUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password, first_name, last_name } = req.body;
  if (username !== undefined) {
    const newUsername = username;
    try {
      const duplicateUsername = await db.query(
        "SELECT username FROM users WHERE username = $1 AND id <> $2",
        [newUsername, req.params.id]
      );
      if (duplicateUsername.rows.length > 0) {
        return res.status(400).json({ message: "That username is taken." });
      }
      await db.query(
        "UPDATE users SET username = $1, modified_at = now() WHERE id = $2 AND username <> $1",
        [newUsername, req.params.id]
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
  if (first_name !== undefined) {
    const newFirstName = first_name;
    try {
      await db.query(
        "UPDATE users SET first_name = $1, modified_at = now()  WHERE id = $2 AND first_name <> $1",
        [newFirstName, req.params.id]
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
  if (last_name !== undefined) {
    const newLastName = last_name;
    try {
      await db.query(
        "UPDATE users SET last_name = $1, modified_at = now()  WHERE id = $2 AND last_name <> $1",
        [newLastName, req.params.id]
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
  if (password !== undefined) {
    try {
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(password, salt);
      await db.query(
        "UPDATE users SET password = $1, modified_at = now()  WHERE id = $2",
        [newHashedPassword, req.params.id]
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
  try {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};
