import mongoose from 'mongoose';

const connectDBM = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/moviesdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Thoát nếu không kết nối được
  }
};

export default connectDBM;
