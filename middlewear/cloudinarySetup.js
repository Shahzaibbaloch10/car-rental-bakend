const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config(); // .env file ko load karne ke liye

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.cld_name,
  api_key: process.env.cld_api_key,
  api_secret: process.env.cld_api_secret
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "carimg", // Cloudinary ke andar folder ka naam
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
