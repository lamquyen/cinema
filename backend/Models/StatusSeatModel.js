import mongoose from 'mongoose';

const { Schema } = mongoose;


const SeatStatusSchema = new Schema({
    showtimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'showtimes',
        required: true
    },
    seatId: {
        type: String, // For example: "A-1", "B-3", etc.
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'selected', 'booked'], // Valid states for a seat
        default: 'available'
    }
}, { timestamps: true });

// Create a unique index to prevent duplicate entries for the same showtime and seat
SeatStatusSchema.index({ showtimeId: 1, seatId: 1 }, { unique: true });

const SeatStatusModel = mongoose.model('layouts', SeatStatusSchema);
export default SeatStatusModel;
