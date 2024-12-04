import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: [true, "Please provide your full name"],
    },
    email: {
      type: String,
      require: [true, "Please add an email"],
      unique: true,
      trim: true,
    },
    phone: { type: String, require: [true, "Please add a phone number"] },
    sex: {
      type: String,
      enum: ["Nam", "Nữ"],
      required: [true, "Please select your sex"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please add a date of birth"],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    confirmPassword: {
      type: String,
      require: [true, "Please confirm your password"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
