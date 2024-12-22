const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 📌 Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 Set Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Your folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file types
  },
});

// 📌 Create Multer Upload Middleware
const upload = multer({ storage });

module.exports = { cloudinary, upload };
