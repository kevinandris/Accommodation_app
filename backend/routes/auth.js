const router = require("express").Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/* Configure Multer for file Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* USER REGISTER */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    /* Take all information from the form */
    const { firstName, lastName, email, password } = req.body;

    /* The uploaded file is available as req.file */
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    /* path to the uploaded profile photo */
    const profileImagePath = profileImage.path;

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user already exists!" });
    }

    /* Hash the password - so we cant see user's pass on mongoDB */
    const salt = await bycrypt.genSalt();
    const hashPassword = await bycrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      profileImagePath,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console
      .log(500)
      .json({ message: "Registration failed!", error: error.message });
  }
});

module.exports = router;
