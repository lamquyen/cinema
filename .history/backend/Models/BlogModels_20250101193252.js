import mongoose from 'mongoose';

const { Schema } = mongoose;

const Blogchema = new Schema({
    img: { type: String, required: true },
    title: { type: String, required: true },
    describe: { type: String, required: true }

}, { timestamps: true });

const BlogModel = mongoose.model('blogs', Blogchema);
export default BlogModel;