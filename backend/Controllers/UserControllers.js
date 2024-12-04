import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";

//Register
const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    sex,
    dateOfBirth,
    password,
    confirmPassword,
  } = req.body;
  try {
    const userExists = await User.findOne({ email });
    //check user exists
    if (userExists) {
      res.status(400);
      throw new Error("Tài khoản đã tồn tại");
    }
    //else create user

    // hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in DB
    const user = await User.create({
      fullName,
      email,
      phone,
      sex,
      dateOfBirth,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    // if user create success send user data and token to client
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        sex: user.sex,
        dateOfBirth: user.dateOfBirth,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    //find in DB
    const user = await User.findOne({ email });
    //if user exists compare pass with hash pass then send user data and token to client
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        sex: user.sex,
        dateOfBirth: user.dateOfBirth,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Email hoặc mật khẩu không hợp lệ");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { registerUser, loginUser };
