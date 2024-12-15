import mongoose from 'mongoose';

const { Schema } = mongoose;

const SeatLayoutSchema = new Schema({
    layoutName: { type: String, required: true },
    seat: [
        {
            row: { type: String, required: true },
            seats: [
                {
                    number: { type: String, required: true }

                }
            ]
        }
    ]
}, { timestamps: true });

const SeatLayoutModel = mongoose.model('layouts', SeatLayoutSchema);
export default SeatLayoutModel;