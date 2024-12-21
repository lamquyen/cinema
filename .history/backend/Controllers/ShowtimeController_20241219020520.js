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


// Get

export const getShowtimeByCinemaLocation = async (req, res) => {
  const { location } = req.params;

  try {
    // Tìm tất cả suất chiếu với thông tin cinema có location tương ứng
    const showtimes = await Showtime.find()
      .populate({
        path: 'cinema',
        match: { location }, // Lọc cinema theo location
        select: 'cinemaName img01 location', // Chỉ lấy các trường cần thiết
      })
      .populate('movie', 'title times'); // Lấy thông tin phim nếu cần

    // Lọc lại kết quả để loại bỏ các suất chiếu không khớp location
    const filteredShowtimes = showtimes.filter(
      (showtime) => showtime.cinema !== null
    );

    if (filteredShowtimes.length === 0) {
      return res.status(404).json({ message: 'No showtimes found for this location' });
    }

    res.status(200).json(filteredShowtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};