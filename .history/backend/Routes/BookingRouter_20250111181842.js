import express from "express";
import {
  getAllBookings,
  getAllBookingsPagination,
  getByShowtimeId,
  getFilterOptions,
} from "../Controllers/BookingController.js";

const router = express.Router();

router.get("/", getAllBookings);
router.get("/all-booking-pagination", getAllBookingsPagination);
router.get("/filter-options", getFilterOptions);
router.get("/showtime/:showtimeId", getByShowtimeId);

export default router;