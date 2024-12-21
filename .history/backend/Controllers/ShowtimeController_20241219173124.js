import Cinema from "../Models/CinemaModels.js";
import Showtime from "../Models/ShowtimeModels.js";


//CreateShowtime
export const CreateShowtime = async(req,res) =>{
    const {
        cinema,
        movie,
        date,
        days,
        times,
        room,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP
      } = req.body;
    
      const newShowtime = new Showtime({
        cinema,
        movie,
        date,
        days,
        times,
        room,
        priceStandard,
        priceVIP,
        seatsStandard,
        seatsVIP,
      });
    
      try {
        const savedShowtime = await newShowtime.save();
        res.status(201).json(savedShowtime);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

// Get showtime by cinemaID

export const getShowtimeByCinemaId = async (req,res) =>{
    const { cinemaId } = req.params;

  try {
    // Tìm các suất chiếu theo cinemaId
    const showtimes = await Showtime.find({ cinema: cinemaId })
      .populate('movie', 'title times') // Lấy thông tin phim (chỉ lấy title và duration)
      .populate('cinema','cinemaName')
      .select('-__v'); // Loại bỏ trường __v không cần thiết

    if (!showtimes || showtimes.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu cho rạp này.' });
    }

    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get showTime by title movie

export const getShowtimeByMovieTitle = async (req, res) => {
  const { title } = req.query; // Lấy tên phim từ query parameters

  try {
    // Tìm kiếm phim theo tên
    const showtimes = await Showtime.find()
      .populate({
        path: 'movie', // Liên kết với model Movie
        match: { title: { $regex: title, $options: 'i' } }, // Tìm phim có title khớp, không phân biệt chữ hoa/chữ thường
        select: 'title' // Chỉ lấy trường title của movie
      })
      .populate('cinema', 'cinemaName') // Lấy thông tin rạp chiếu
      .select('-__v'); // Loại bỏ trường __v không cần thiết

    // Lọc ra các suất chiếu mà movie khớp với điều kiện
    const filteredShowtimes = showtimes.filter(showtime => showtime.movie);

    if (!filteredShowtimes.length) {
      return res.status(404).json({ message: 'Không tìm thấy suất chiếu cho tên phim này.' });
    }

    res.json(filteredShowtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get by location cinema

export const getShowtimeByCinemaLocation = async (req, res) => {
  const { location } = req.params;

  try {
    // Tìm Cinema theo location
    const cinema = await Cinema.findOne({ location });

    if (!cinema) {
      return res.status(404).json({ message: "Không tìm thấy rạp chiếu." });
    }

    // Tìm các suất chiếu liên quan đến Cinema
    const showtimes = await Showtime.find({ cinema: cinema._id })
      .populate("movie") // Lấy thông tin chi tiết về phim
      .exec();

    res.json(showtimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể tải suất chiếu." });
  }
};

// get by times and movie

export const getShowtimmeByTimeAndMovie = async(req, res) =>{
  const { movieId, time } = req.query; // Lấy movieId và time từ query string

  // Kiểm tra xem movieId có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({ message: 'ID bộ phim không hợp lệ' });
  }

  try {
    // Truy vấn các suất chiếu có movieId và giờ chiếu (times) trùng khớp
    const showtimes = await Showtime.find({
      movie: mongoose.Types.ObjectId(movieId),
      times: time
    });

    // Kiểm tra nếu có suất chiếu với movieId và giờ chiếu trùng khớp
    if (showtimes.length > 0) {
      res.status(200).json(showtimes); // Trả về các suất chiếu tìm được
    } else {
      res.status(404).json({ message: 'Không có suất chiếu cho bộ phim này với giờ chiếu này' });
    }
  } catch (error) {
    console.error("Error:", error); // In ra chi tiết lỗi trong console
    res.status(500).json({ message: 'Đã có lỗi xảy ra', error: error.message });
  }
}