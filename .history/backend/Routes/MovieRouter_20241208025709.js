import express from "express";
import {createMovie, getAllMovie, getMovieById, getReleasedMovies, getNotReleasedMovies} from '../Controllers/MovieController.js'

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie);
router.get("/released", getReleasedMovies);
router.get("/not_released", getNotReleasedMovies);
router.get("/:id", getMovieById);


export default router