// import express from "express";
// const router = express.Router();
// import {
//   createLadies,
//   deleteLadies,
//   getLadies,
//   updateLadies,
// } from "../controllers/ladiesController.js";
// import { verifyAccessToken } from "../helpers/jsonwebtoken.js";

// router.post("", getLadies);
// router.post("", verifyAccessToken, createLadies);
// router.post("/:id", verifyAccessToken, updateLadies);
// router.post("/:id", verifyAccessToken, deleteLadies);

// export default router;

import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { User } from "../models/userModel";


//setup cloudinary
cloudinary.config({
	cloud_name: "YOUR_CLOUD_NAME",
	api_key: "YOUR_API_KEY",
	api_secret: "YOUR_API_SECRET",
});


//configure multer storage

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shuwa',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
})


const upload = multer({storage:storage});

//upload image route 
router.post('/upload', upload.single('image'), async (req, res) => {
  // Check if user is an admin
  const user = await User.findById(req.user.id);
  if (!user.isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the Cloudinary URL
  const url = req.file.path;

  // Add the URL to the images array
  user.images.push(url);
  await user.save();

  res.json({ success: true });
});