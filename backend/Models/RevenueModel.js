import mongoose from 'mongoose';

const { Schema } = mongoose;

const RevenueSchema = new Schema({
    showtimeID: { type: [mongoose.Schema.Types.ObjectId], ref: 'showtimes', required: true },
    totalPrice: { type: Number, required: true }

}, { timestamps: true });

const RevenueModel = mongoose.model('revenues', RevenueSchema);
export default RevenueModel;