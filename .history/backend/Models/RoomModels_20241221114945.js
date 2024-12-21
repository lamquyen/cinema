import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "layouts", 
    required: true,
  },
  priceStandard: {
    type: Number,
    required: true,
  },
  priceVIP: {
    type: Number,
    required: true,
  },
  seatsStandard: {
    total: { type: Number, required: true },
    available: { type: Number, required: true },
  },
  seatsVIP: {
    total: { type: Number, required: true },
    available: { type: Number, required: true },
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;

