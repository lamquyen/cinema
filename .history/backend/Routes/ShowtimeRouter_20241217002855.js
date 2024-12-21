import express from "express";
import { CreateShowtime } from "../Controllers/ShowtimeController";

const router = express.Router();

router.post("/",CreateShowtime);


export default router