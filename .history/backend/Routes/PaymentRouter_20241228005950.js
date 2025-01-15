import express from "express";
import { Payment } from "../Controllers/Payment.js"

const router = express.Router();

router.post("/payment", Payment)



export default router