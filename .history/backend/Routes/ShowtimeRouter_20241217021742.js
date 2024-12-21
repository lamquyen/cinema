import express from "express";
import { CreateShowtime, getShowtimeByCinemaId } from "../Controllers/ShowtimeController.js";

const router = express.Router();

router.post("/",setShowDate,CreateShowtime);
router.get("/cinema/:cinemaId",getShowtimeByCinemaId);


export default router