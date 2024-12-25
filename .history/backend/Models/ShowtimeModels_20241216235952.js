import mongoose from 'mongoose';

const showtimeSchema = new mongoose.Schema({
  cinema: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cinema', 
    required: true 
  },
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  }, // Ngày chiếu
  times: [{ 
    type: String, 
    required: true 
  }], // Giờ chiếu (một suất chiếu có thể có nhiều giờ chiếu)
  room: { 
    type: String, 
    required: true 
  },
  priceStandard: { 
    type: Number, 
    required: true 
  },
  priceVIP: { 
    type: Number, 
    required: true 
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

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;
