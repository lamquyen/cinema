import asyncHandler from "express-async-handler";
import Booking from "../Models/BookingModels.js";

const getAllBookings = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("userId", "fullName email")
      .populate({
        path: "showtimeId",
        populate: [
          { path: "movie", select: "title" },
          { path: "cinema", select: "cinemaName" },
          { path: "room", select: "roomName" },
        ],
      })
      .exec();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllBookingsPagination = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Build filter object based on query parameters
    const filters = {};
    const { ticketCode, movieTitle, cinema, startDate, endDate } = req.query;

    if (ticketCode) {
      filters.ticketCode = { $regex: ticketCode, $options: "i" };
    }

    // Date range filter
    if (startDate && endDate) {
      const endDateTime = new Date(endDate);
      endDateTime.setHours(23, 59, 59, 999); // Thiết lập thời gian cuối ngày

      filters.createdAt = {
        $gte: new Date(startDate),
        $lte: endDateTime,
      };
    }

    // Create aggregation pipeline for complex filters
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $lookup: {
          from: "showtimes",
          localField: "showtimeId",
          foreignField: "_id",
          as: "showtimeId",
        },
      },
      { $unwind: "$userId" },
      { $unwind: "$showtimeId" },
      {
        $lookup: {
          from: "movies",
          localField: "showtimeId.movie",
          foreignField: "_id",
          as: "showtimeId.movie",
        },
      },
      {
        $lookup: {
          from: "cinemas",
          localField: "showtimeId.cinema",
          foreignField: "_id",
          as: "showtimeId.cinema",
        },
      },
      {
        $lookup: {
          from: "rooms",
          localField: "showtimeId.room",
          foreignField: "_id",
          as: "showtimeId.room",
        },
      },
      { $unwind: "$showtimeId.movie" },
      { $unwind: "$showtimeId.cinema" },
      { $unwind: "$showtimeId.room" },
    ];

    // Add filters to pipeline
    if (Object.keys(filters).length > 0) {
      pipeline.push({ $match: filters });
    }

    if (movieTitle) {
      pipeline.push({
        $match: {
          "showtimeId.movie.title": { $regex: movieTitle, $options: "i" },
        },
      });
    }

    if (cinema) {
      pipeline.push({
        $match: {
          "showtimeId.cinema.cinemaName": { $regex: cinema, $options: "i" },
        },
      });
    }

    // Get total count for pagination
    const totalBookings = await Booking.aggregate([
      ...pipeline,
      { $count: "total" },
    ]);
    const total = totalBookings[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Add pagination to pipeline
    pipeline.push({ $skip: skip }, { $limit: limit });

    const bookings = await Booking.aggregate(pipeline);

    res.status(200).json({
      bookings,
      totalPages,
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getFilterOptions = asyncHandler(async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "showtimes",
          localField: "showtimeId",
          foreignField: "_id",
          as: "showtimeId",
        },
      },
      { $unwind: "$showtimeId" },
      {
        $lookup: {
          from: "movies",
          localField: "showtimeId.movie",
          foreignField: "_id",
          as: "showtimeId.movie",
        },
      },
      {
        $lookup: {
          from: "cinemas",
          localField: "showtimeId.cinema",
          foreignField: "_id",
          as: "showtimeId.cinema",
        },
      },
      { $unwind: "$showtimeId.movie" },
      { $unwind: "$showtimeId.cinema" },
      {
        $group: {
          _id: null,
          movies: { $addToSet: "$showtimeId.movie.title" },
          cinemas: { $addToSet: "$showtimeId.cinema.cinemaName" },
        },
      },
    ];

    const [result] = await Booking.aggregate(pipeline);

    res.json({
      movies: result ? result.movies.sort() : [],
      cinemas: result ? result.cinemas.sort() : [],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


export const getByShowtimeId = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    // Tìm các booking với showtimeId và populate name từ bảng promotion
    const bookings = await Booking.find({ showtimeId })
      .select(
        "seat.typeSeat foodNames.name foodNames.quantity totalSeatPrice totalFoodPrice discountId"
      )
      .populate({
        path: "discountId",
        select: "name", // Chỉ lấy trường 'name' từ bảng promotion
      });

    // Trả về dữ liệu JSON
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Không thể lấy dữ liệu Booking", error });
  }
};

export { getAllBookings, getAllBookingsPagination, getFilterOptions };