import express from "express";
import { CreateShowtime, getShowtimeByCinemaId } from "../Controllers/ShowtimeController.js";
import setShowDate from "../middlewares/setShowDate.js";

const router = express.Router();

router.post("/",setShowDate,CreateShowtime);
router.get("/cinema/:cinemaId",getShowtimeByCinemaId);


export default router