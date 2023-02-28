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

import express from "express";
const router = express.Router();
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { User } from "../models/userModel.js";

// const adminRouter = express.Router();

//setup cloudinary
cloudinary.config({
	cloud_name: "itgenius",
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//configure multer storage

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "shuwa",
		allowed_formats: ["jpg", "jpeg", "png"],
		public_id: (req, file) => `${Date.now()}_${file.originalname}`,
	},
});

const upload = multer({ storage: storage });

//upload image route
router.post("/upload",  upload.single("image"), async (req, res) => {
  try {
    // Check if user is an admin
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get the Cloudinary URL
    const url = req.file.path;

    // Extract additional fields from the request body
    const { name, age, location, color, availability, price } = req.body;

    // Create a new user object with the extracted fields
    const newUser = new User({
      email: req.user.email,
      password: req.user.password,
      name: name,
      age: age,
      location: location,
      color: color,
      status: availability,
      price: price,
      isAdmin: req.user.isAdmin,
      images: [url],
    });

    // Save the new user document to the database
    await newUser.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});


export default router;
