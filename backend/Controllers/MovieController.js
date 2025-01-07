import Movie from "../Models/MovieModels.js";
import SeatLayoutModel from "../Models/SeatLayout.js";
import SeatStatusModel from "../Models/StatusSeatModel.js";
import Room from "../Models/RoomModels.js";
import Showtime from "../Models/ShowtimeModels.js";
import BlogModel from "../Models/BlogModels.js";
import mongoose from "mongoose";

// CreateMovie
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      img,
      img02,
      describe,
      linkTrailer,
      showDate,
      genre,
      cast,
      // rating,
      type,
      times,
      nation,
      director,
      manufacturer,
    } = req.body;
    const newMovie = new Movie({
      title,
      img,
      img02,
      describe,
      linkTrailer,
      showDate,
      genre,
      cast,
      // rating,
      type,
      times,
      nation,
      director,
      manufacturer,
    });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get All Movie
export const getAllMovie = async (req, res) => {
  try {
    const { released } = req.query; // 'released' là tham số truy vấn từ URL

    let query = {};

    // Xóa phần giờ, phút, giây trong ngày hiện tại để chỉ so sánh theo ngày
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây thành 0

    // Nếu có tham số `released`, lọc theo trạng thái phát hành
    if (released === "true") {
      query.showDate = { $lte: today }; // Phim đã phát hành (hoặc đang phát hành)
    } else if (released === "false") {
      query.showDate = { $gt: today }; // Phim chưa phát hành
    }

    // Tìm phim theo truy vấn
    const movies = await Movie.find(query);

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Movie By Id
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Truy vấn bằng ID
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie); // Trả về dữ liệu phim
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving movie" });
  }
};

// Get Released Movies
export const getReleasedMovies = async (req, res) => {
  try {
    // Lấy ngày hiện tại
    const today = new Date();

    // Lọc các phim có showDate <= ngày hiện tại và showDate >= ngày hiện tại
    const releasedMovies = await Movie.find({
      showDate: { $lte: today }, // Phim đã phát hành
    });
    res.json(releasedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get  Not Released Movies
export const getNotReleasedMovies = async (req, res) => {
  try {
    // Lấy ngày hiện tại
    const today = new Date();

    const notReleasedMovies = await Movie.find({
      showDate: { $gt: today }, // Phim chưa phát hành
    });
    res.json(notReleasedMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get 3 flim top rating
export const getTopRating = async (req, res) => {
  try {
    const today = new Date();

    // Lọc phim đang chiếu, sắp xếp theo rating giảm dần, giới hạn 3 phim
    const movies = await Movie.find({ showDate: { $lte: today } })
      .sort({ rating: -1 }) // Sắp xếp theo rating giảm dần
      .limit(3); // Lấy 3 phim đầu tiên

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const SeatLayout = async (req, res) => {
  const { showtimeId } = req.params;

  try {
    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).send("Showtime not found");
    }

    const roomId = showtime.room; // Lấy roomId từ showtime document

    // Tìm room để lấy layoutId
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).send("Room not found");
    }

    const layoutId = room.seat; // Lấy layoutId từ room document

    // Tìm layout từ layoutId
    const layout = await SeatLayoutModel.findById(layoutId);
    if (!layout) {
      return res.status(404).send("Layout not found");
    }

    console.log("Layout found:", layout);

    const seatStatus = await SeatStatusModel.findOne({ showtimeId });
    console.log("đây là status", seatStatus);
    if (seatStatus) {
      // Chuyển đổi layout sang object thuần
      const layoutJSON = layout.toObject();

      // Cập nhật trạng thái ghế
      layoutJSON.seat.forEach((row) => {
        row.seats.forEach((seat) => {
          const seatState = seatStatus.StatusSeats.find(
            (s) => s.number === seat.number
          );
          seat.status = seatState ? seatState.status : "available";
        });
      });

      // Trả về layout đã cập nhật
      return res.json(layoutJSON);
    }

    // Nếu không có trạng thái ghế, trả về layout gốc
    return res.json(layout.toObject());
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server error");
  }
};
export { SeatLayout };

// Update Movie By Id
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params; // Lấy id từ params
    const updateData = req.body; // Lấy dữ liệu cập nhật từ body

    // Tìm và cập nhật thông tin phim dựa trên id
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, {
      new: true, // Trả về dữ liệu đã được cập nhật
      runValidators: true, // Chạy các validator trong schema
    });

    // Kiểm tra nếu không tìm thấy phim
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie); // Trả về thông tin phim đã cập nhật
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Movie By Id
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ request params

    // Tìm và xóa phim dựa trên ID
    const deletedMovie = await Movie.findByIdAndDelete(id);

    // Kiểm tra nếu không tìm thấy phim
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: "Movie deleted successfully", deletedMovie });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Hàm updateStatusSeat không nên gửi phản hồi HTTP trực tiếp
export const updateStatusSeat = async (showtimeId, StatusSeats) => {
  try {
    let seatStatus = await SeatStatusModel.findOne({ showtimeId });

    if (seatStatus) {
      // Nếu đã tồn tại, thêm hoặc cập nhật các ghế mới vào mảng StatusSeats
      StatusSeats.forEach((newSeat) => {
        const existingSeat = seatStatus.StatusSeats.find(
          (seat) => seat.number === newSeat.number
        );
        if (!existingSeat) {
          seatStatus.StatusSeats.push(newSeat); // Thêm ghế mới
        } else {
          existingSeat.status = newSeat.status; // Cập nhật trạng thái ghế
        }
      });
    } else {
      // Nếu không tồn tại, tạo mới
      seatStatus = new SeatStatusModel({
        showtimeId,
        StatusSeats,
      });
    }

    // Lưu vào cơ sở dữ liệu
    await seatStatus.save();
    return seatStatus; // Trả về dữ liệu đã cập nhật
  } catch (error) {
    console.error(error);
    throw new Error("Có lỗi xảy ra khi thêm trạng thái ghế.");
  }
};
export const blog = async (req, res) => {
  try {
    const blog = await BlogModel.find();
    res.status(200).json(blog);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CallbackPayment tối ưu hơn
export const getAllMoviePagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // Items per page
    const skip = (page - 1) * limit;

    const totalMovies = await Movie.countDocuments();
    const totalPages = Math.ceil(totalMovies / limit);

    const movies = await Movie.find()
      .skip(skip)
      .limit(limit)
      .sort({ showDate: -1 }); // Sort by show date descending

    res.json({
      movies,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
