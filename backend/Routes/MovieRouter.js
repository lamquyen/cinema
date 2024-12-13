import express from "express";
const router = express.Router();
import { SeatLayout } from '../Controllers/MovieController.js'



router.get('/seats', SeatLayout)
export default router;