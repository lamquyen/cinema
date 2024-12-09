import express from "express";
import {
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/update", protect, updateUserProfile);

export default router;
