import express from "express";
import {
  getAllUsers,
  loginAdmin,
  loginUser,
  registerUser,
  updateUserProfile,
  GetAllTicketsOfUser
} from "../Controllers/UserControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/login-admin", loginAdmin);
router.put("/update", protect, updateUserProfile);
router.get("/", getAllUsers);
router.get("/transaction-history", GetAllTicketsOfUser)
export default router;