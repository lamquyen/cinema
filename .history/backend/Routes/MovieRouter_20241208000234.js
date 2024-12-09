import express from "express";
import {createMovie, getAllMovie, getMovieById} from '../Controllers/MovieController.js'

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie);
router.get("/:id", getMovieById);


export default router