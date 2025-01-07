import mongoose from "mongoose";
import User from "./UserModels.js"; // Thêm dòng này để đảm bảo User model được đăng ký
import Showtime from "./ShowtimeModels.js"; // Thêm dòng này để đảm bảo Showtime model được đăng ký
import Movie from "./MovieModels.js"; // Thêm dòng này để đảm bảo Movie model được đăng ký

const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    orderId: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Sửa từ "users" thành "User" để match với model name
      required: true,
    },
    showtimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: true,
    },
    seat: [
      {
        number: { type: String, required: true },
        typeSeat: { type: String, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    ticketCode: { type: String, required: true },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);
export default BookingModel;
