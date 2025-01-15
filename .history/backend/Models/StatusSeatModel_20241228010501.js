import mongoose from 'mongoose';

const { Schema } = mongoose;


const SeatStatusSchema = new Schema({
    showtimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'showtimes',
        required: true
    },

    StatusSeats: [
        {
            number: {
                type: String, required: true,
                ref: 'layouts.seat.seats.number'
            },
            status: { type: String, required: true }
        }
    ]
}, { timestamps: true });

SeatStatusSchema.index({ showtimeId: 1, seatName: 1 }, { unique: true });



const SeatStatusModel = mongoose.model('statusseats', SeatStatusSchema);
export default SeatStatusModel;