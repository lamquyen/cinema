import express from "express";
import {createMovie, getAllMovie} from '../Controllers/MovieController.js'

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie)

export default router