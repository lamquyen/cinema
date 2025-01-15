import express from "express";
import { CreateShowtime, getShowtimeByCinemaId, getShowtimeByCinemaLocation, getShowtimeById, getShowtimeByMovieId, getShowtimeByMovieTitle, getShowtimmeByTimeAndMovie } from "../Controllers/ShowtimeController.js";
import setShowDate from "../middlewares/setShowDate.js";

const router = express.Router();

router.post("/",setShowDate,CreateShowtime);
router.get("/:id",getShowtimeById);
router.get("/cinema/:cinemaId",getShowtimeByCinemaId);
router.get("/movie/:movieId",getShowtimeByMovieId);
router.get('/showtimes-by-movie', getShowtimeByMovieTitle);
router.get('/location/:location', getShowtimeByCinemaLocation);
router.get('/by-movie-and-time', getShowtimmeByTimeAndMovie);

export default router