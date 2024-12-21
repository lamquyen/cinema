import Movie from '../Models/MovieModels.js';  // Đảm bảo import đúng model Movie

const checkMovieShowDate = async function(next) {
  try {
    const movie = await Movie.findById(this.movie);  // Tìm phim từ ID movie
    if (!movie) {
      return next(new Error('Movie not found'));
    }

    const showDate = new Date(movie.showDate); // Ngày chiếu phim
    const currentDate = new Date(); // Ngày hiện tại

    // Kiểm tra nếu phim chưa chiếu
    if (showDate > currentDate) {
      return next(new Error('Movie has not started yet, cannot create showtime'));
    }

    // Nếu phim đã chiếu, tiếp tục lưu Showtime
    next();
  } catch (err) {
    next(err);
  }
};

export default checkMovieShowDate;

