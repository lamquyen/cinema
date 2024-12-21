import express from "express";
import { CreateShowtime, getShowtimeByCinemaId } from "../Controllers/ShowtimeController";

const router = express.Router();

router.post("/",CreateShowtime);
router.get("/cinema/:cinemaId",getShowtimeByCinemaId);


export default router