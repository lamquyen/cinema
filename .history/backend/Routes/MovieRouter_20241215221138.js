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
} from "../Controllers/MovieController.js";

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie);
router.get("/released", getReleasedMovies);
router.get("/not_released", getNotReleasedMovies);
router.get("/top_rating", getTopRating);
router.get("/seats", SeatLayout);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);
export default router;