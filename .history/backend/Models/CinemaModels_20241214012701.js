import mongoose from 'mongoose';

// Định nghĩa schema cho phim
const cinemaSchema = new mongoose.Schema({
  cinemaName: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  img01: {
    type: String,
    required: true,
    trim: true,
  },
  img02: {
    type: String,
    required: true,
    trim: true,
  },
  img03: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
    trim: true,
  },
  introduce01: {
    type: String,
    required: true,
  },
  introduce02: {
    type: [String],
    required: true,
  },
});



// Tạo model từ schema
const Cinema = mongoose.model('Cinema', cinemaSchema);

export default Cinema;