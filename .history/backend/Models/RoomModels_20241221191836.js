import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
   cinema: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Cinema', 
      required: true 
    },
  roomName: {
    type: String,
    required: true,
  },
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
  priceCouple:{
    type:Number,
    req:true
  },
  seatsStandard: {
    total: { type: Number, required: true },
    available: { type: Number, required: true },
  },
  seatsVIP: {
    total: { type: Number, required: true },
    available: { type: Number, required: true },
  },
  seatsCouple: {
    total: { type: Number, required: true },
    available: { type: Number, required: true },
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
