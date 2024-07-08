// backend/routes/activity.js
const express = require("express");
const router = express.Router();
const Submission = require("../model/submissions.js");

// Get activity data
router.get("/activity", async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const submissions = await Submission.find({ userId });
        const activity = submissions.map(submission => ({
            date: submission.submittedAt.toISOString().split('T')[0],
            count: 1,  // Each submission counts as one activity
        }));

        res.json(activity);
    } catch (error) {
        console.error("Error fetching activity data:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
