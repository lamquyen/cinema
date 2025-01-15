import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.js";
import BookingModel from "../Models/BookingModels.js";
import Showtime from "../Models/ShowtimeModels.js";

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

//Login user
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

// login admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tìm user trong DB
    const user = await User.findOne({ email });

    // Kiểm tra tồn tại và vai trò admin
    if (
      user &&
      user.isAdmin &&
      (await bcrypt.compare(password, user.password))
    ) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error(
        "Thông tin đăng nhập không hợp lệ hoặc bạn không phải admin"
      );
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

// Get All User
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const GetAllTicketsOfUser = async (req, res) => {
  const { userId } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 8;

  try {
    const skip = (page - 1) * pageSize;
    const bookings = await BookingModel.find({ userId })
      .populate({
        path: "showtimeId",
        select: "movie times days cinema room ", // Chọn các trường cần thiết từ showtimeId
        populate: [
          { path: "movie", select: "title img type" }, // Populate movie
          { path: "cinema", select: "cinemaName" }, // Populate cinema
          { path: "room", select: "roomName" }, // Populate room
        ],
      })
      .sort({ createdAt: -1 }) // Sắp xếp theo ngày mới nhất
      .skip(skip) // Bỏ qua các bản ghi ở các trang trước
      .limit(pageSize); // Giới hạn số lượng bản ghi mỗi lần trả về

    if (bookings.length === 0) {
      return res.status(400).send("No bookings found for this user");
    }
    const formattedBookings = bookings.map((booking) => ({

      totalPrice: booking.totalPrice,
      ticketCode: booking.ticketCode,
      seats: booking.seat.map((seat) => seat.number).join(", "),
      foodNames: booking.foodNames.map((food) => `${food.name} (x${food.quantity})`).join(", "),
      showtime: {
        img: booking.showtimeId?.movie?.img,

        time: booking.showtimeId?.times,
        movieTitle: booking.showtimeId?.movie?.title,
        type: booking.showtime?.movie?.type,
        room: booking.showtimeId?.room?.roomName,
        cinema: booking.showtimeId?.cinema?.cinemaName,

        day: booking.showtimeId?.days.map(
          (day) => new Date(day).toISOString().split("T")[0]
        ),
      },
    }));
    const totalBookings = await BookingModel.countDocuments({ userId }); // Đếm tổng số booking của user
    const totalPages = Math.ceil(totalBookings / pageSize); // Tính số trang

    return res.status(200).json({
      bookings: formattedBookings,
      totalPages, // Số trang tổng cộng
      currentPage: page, // Trang hiện tại
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get User By Id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Truy vấn bằng ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Trả về dữ liệu phim
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user" });
  }
};

// Delete User By Id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ request params

    // Tìm và xóa phim dựa trên ID
    const deletedUser = await User.findByIdAndDelete(id);

    // Kiểm tra nếu không tìm thấy phim
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user by Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { fullName, email, phone, sex, dateOfBirth } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.sex = sex || user.sex;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        sex: updatedUser.sex,
        dateOfBirth: updatedUser.dateOfBirth,
        // isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete User By Id
const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem user có tồn tại không
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Xóa user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// Check if email exists
const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("Email không tồn tại trong hệ thống");
    }

    res.json({ exists: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("Không tìm thấy tài khoản");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Đặt lại mật khẩu thành công",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  registerUser,
  loginUser,
  loginAdmin,
  updateUserProfile,
  getAllUsers,
  GetAllTicketsOfUser,
  getUserById,
  deleteUser,
  updateUserByAdmin,
  deleteUserByAdmin,
  checkEmail,
  resetPassword,
};