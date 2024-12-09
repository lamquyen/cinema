import express from "express";
import {createMovie, getAllMovie} from '../Controllers/MovieController'

const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovie)