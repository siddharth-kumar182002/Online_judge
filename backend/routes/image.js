const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const User = require("../model/User.js");
const verifyToken = require("../middleware/auth.js");

// Set up multer for storing uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.userId}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Route to upload the profile image
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
    console.log("inside uploads")
    try {
        const user = await User.findOne({ email: req.userId });  // Change to findOne
        console.log(user);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Delete the previous image if it exists
        if (user.image) {
            fs.unlink(user.image, (err) => {
                if (err) {
                    console.error("Error deleting the previous image:", err);
                } else {
                    console.log("Previous image deleted successfully");
                }
            });
        }

        user.image = req.file.path;
        await user.save();

        res.json({ message: 'Image uploaded successfully', imagePath: user.image });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading image', error: err.message });
    }
});

module.exports = router;
