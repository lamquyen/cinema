import express from "express";
import { createCinema, getAllCinema,getCinemaById } from "../Controllers/CinemaController.js";

const router = express.Router();

router.post("/",createCinema);
router.get("/",getAllCinema);
router.get("/:id",getCinemaById)

export default router