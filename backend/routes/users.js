const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const Submission = require("../model/submissions.js");
const verifyToken = require("../middleware/auth.js");

// Get user by ID
router.get("/:userId", verifyToken, async (req, res) => {
    console.log("inside users from search bar");
    console.log(req.params.userId);
    try {
        const user = await User.find({email:req.params.userId});
        if (!user) {
            return res.status(404).send("User not found");
        }
        const submissions = await Submission.find({ userId: req.params.userId }).populate('problemId');
       
        res.json({ user, submissions });
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
