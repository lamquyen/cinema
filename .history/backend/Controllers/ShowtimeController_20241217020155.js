import Showtime from "../Models/ShowtimeModels.js";


//CreateShowtime
export const CreateShowtime = async(req,res) =>{
    const {
        cinema,
        movie,
        date,
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