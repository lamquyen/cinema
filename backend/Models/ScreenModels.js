import mongoose from 'mongoose';

const { Schema } = mongoose;

const ScreenSchema = new Schema({
    nameScreen: { type: String },
    cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'cinemas', required: true },
    seatLayout: { type: mongoose.Schema.Types.ObjectId, ref: 'layouts', required: true }
}, { timestamps: true });

const ScreenModel = mongoose.model('screens', ScreenSchema);
export default ScreenModel;