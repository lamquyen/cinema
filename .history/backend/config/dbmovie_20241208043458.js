import mongoose from "mongoose";

export const connectDBM = async () => {
    mongoose.connect('mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
        .then(() => console.log('Connected to MongoDB via Compass'))
        .catch(err => console.error('Could not connect to MongoDB', err));
};
