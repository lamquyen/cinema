import mongoose from 'mongoose';
import checkMovieShowDate from '../middlewares/checkMovieShowDate.js';

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
    required:true
  },
  days:{
    type:[Date],
    required:true
  },
    // Ngày chiếu
  times:{ 
    type: String, 
    required: true 
  }, // Giờ chiếu (một suất chiếu có thể có nhiều giờ chiếu)
  room: { 
    type: String, 
    required: true 
  },
});

// Middleware checkMovieShowDate trong pre-save hook
showtimeSchema.pre('save', checkMovieShowDate);

const Showtime = mongoose.model('Showtime', showtimeSchema);

export default Showtime;
