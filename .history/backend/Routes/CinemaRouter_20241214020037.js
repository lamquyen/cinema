import express from "express";
import { createCinema, getAllCinema,getCinemaByLocaytion } from "../Controllers/CinemaController";

const router = express.Router();

router.post("/",createCinema);
router.get("/",getAllCinema);
router.get("/:location",getCinemaByLocaytion)

export default router