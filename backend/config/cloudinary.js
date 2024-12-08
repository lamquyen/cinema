import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


cloudinary.config({
    cloud_name: 'v5vt0g3q',
    api_key: '576655127961732',
    api_secret: '0qctYvEgHYrx81bYtXXuO8VBRUk'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'comment_images', // Thư mục lưu trữ trên Cloudinary
        allowed_formats: ['jpeg', 'png', 'jpg'],
    },
});

export { cloudinary, storage };