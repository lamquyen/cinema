import mongoose from 'mongoose';

const { Schema } = mongoose;

const PaymentSchema = new Schema({
    partnerCode: String,
    orderId: String,
    requestId: String,
    extraData: String,
    amount: Number,
    transId: Number,
    payType: String,
    resultCode: Number,
    refundTrans: Array,
    message: String,
    responseTime: Number,
    lastUpdated: Number,
    signature: String,
}, { timestamps: true });

const PaymentModel = mongoose.model("payments", PaymentSchema);

export default PaymentModel;
