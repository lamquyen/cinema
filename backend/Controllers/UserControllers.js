import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";

//Register
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, sex, dateOfBirth, password } = req.body;
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

// update user
const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user in db
    const user = await User.findById(req.user._id);
    // if user exists update user data and save to DB
    if (user) {
      user.email = email || user.email;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }

      const updatedUser = await user.save();
      // send updated user data and token to client
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        sex: updatedUser.sex,
        dateOfBirth: updatedUser.dateOfBirth,
        password: updatedUser.password,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    }
    // else send error
    else {
      res.status(404);
      throw new Error("Không tìm thấy tài khoản");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { registerUser, loginUser, updateUserProfile };
