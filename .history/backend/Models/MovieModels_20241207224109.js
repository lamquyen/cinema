const mongoose = require('mongoose');

// Định nghĩa schema cho phim
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  describe: {
    type: String,
    required: true,
  },
  linkTrailer: {
    type: String,
    required: true,
    trim: true,
  },
  showDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  cast: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  }
});

// Trường ảo: Kiểm tra phim đã phát hành chưa
movieSchema.virtual('isReleased').get(function () {
  return new Date() >= this.showDate;
});

// Kích hoạt virtual fields trong JSON response
movieSchema.set('toJSON', { virtuals: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

