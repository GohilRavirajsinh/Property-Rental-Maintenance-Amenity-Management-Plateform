const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Setup Cloudinary with Credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Setup Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'property_management', // Cloudinary me kis folder me save karna hai
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

// 3. Create Multer instance
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
