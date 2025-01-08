import mongoose from 'mongoose';

const { Schema } = mongoose;

const Foodchema = new Schema({
    img: { type: String },
    nameF: { type: String, required: true },
    price: { type: Number, required: true }

}, { timestamps: true });

const FoodModel = mongoose.model('foods', Foodchema);
export default FoodModel;