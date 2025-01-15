import express from "express";
import { Payment, CallbackPayment, CheckStatusOrder, getVoucherByCode } from "../Controllers/Payment.js"

const router = express.Router();

router.post("/payment", Payment)

router.post("/callback", CallbackPayment)

router.post("/transaction-status", CheckStatusOrder)
router.post("/getVoucherByCode", getVoucherByCode)
export default router