import express from "express";
import {
  createMovie,
  getAllMovie,
  getMovieById,
  getReleasedMovies,
  getNotReleasedMovies,
  getTopRating,
  SeatLayout,
  updateMovie,
  deleteMovie,
  updateStatusSeat,
  blog,
  getAllMoviePagination,
  getAllFoods
} from "../Controllers/MovieController.js";

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie);
router.get("/all-movie-pagination", getAllMoviePagination);
router.get("/released", getReleasedMovies);
router.get("/not_released", getNotReleasedMovies);
router.get("/top_rating", getTopRating);
router.get("/food", getAllFoods)
router.get("/blog-movie", blog)
router.get("/food", getMovieById);
router.get("/seats/:showtimeId", SeatLayout);
router.post("/update-status/:showtimeId", updateStatusSeat);
router.get("/:id", getMovieById);
router.post("/:id", updateMovie);
router.delete("/:id", deleteMovie);
export default router;
