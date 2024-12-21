import Movie from '../Models/MovieModels.js'; // Import mô hình Movie

// Middleware để lấy showDate từ Movie và gán vào trường `date` trong Showtime
const setShowDate = async (req, res, next) => {
  try {
    // Kiểm tra xem có trường movie trong request body không
    if (req.body.movie) {
      const movie = await Movie.findById(req.body.movie); // Lấy thông tin phim từ Movie ID
      if (movie) {
        req.body.date = movie.showDate; // Gán showDate của Movie vào date của Showtime
      } else {
        return res.status(404).json({ message: 'Movie not found' });
      }
    }
    next(); // Tiến hành tiếp tục với request
  } catch (error) {
    return res.status(500).json({ message: 'Error setting show date', error });
  }
};

export default setShowDate;
