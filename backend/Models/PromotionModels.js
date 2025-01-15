import mongoose from "mongoose";


const promotionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    }
});

const PromotionModel = mongoose.model('promotion', promotionSchema);
export default PromotionModel