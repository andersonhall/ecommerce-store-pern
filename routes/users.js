import express from "express";
import {
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
} from "../db/controllers/usersController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUser);

export default router;
