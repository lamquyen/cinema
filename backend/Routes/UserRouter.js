import express from "express";
import {
  getAllUsers,
  loginAdmin,
  loginUser,
  registerUser,
  updateUserProfile,
  GetAllTicketsOfUser,
  getUserById,
  deleteUser,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../Controllers/UserControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.put("/update", protect, updateUserProfile);
router.put("/update-admin/:id", updateUserByAdmin);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", protect, deleteUser);
router.delete("/delete-admin/:id", deleteUserByAdmin);
router.get("/transaction-history", GetAllTicketsOfUser);

export default router;
