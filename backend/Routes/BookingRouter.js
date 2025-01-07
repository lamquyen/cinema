import express from "express";
import {
  getAllBookings,
  getAllBookingsPagination,
  getFilterOptions,
} from "../Controllers/BookingController.js";

const router = express.Router();

router.get("/", getAllBookings);
router.get("/all-booking-pagination", getAllBookingsPagination);
router.get("/filter-options", getFilterOptions);

export default router;
