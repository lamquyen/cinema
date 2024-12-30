import mongoose from 'mongoose';

const { Schema } = mongoose;

const BookingSchema = new Schema({
    orderId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    showtimeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seat: [
        {
            number: { type: String, required: true },
            typeSeat: { type: String, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    ticketCode: { type: String, required: true }
}, { timestamps: true });

const BookingModel = mongoose.model('bookings', BookingSchema);
export default BookingModel;