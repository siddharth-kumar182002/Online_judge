// backend/routes/leaderboard.js
const express = require('express');
const router = express.Router();
const Submission = require('../model/submissions.js');
const User = require('../model/User.js'); // Assuming you have a user model

router.get('/', async (req, res) => {
    console.log("inside leaderboard");
  try {
    const submissions = await Submission.find();
    //console.log(submissions);
    const userSolvedCount = {};

    submissions.forEach(submission => {
        //console.log(submission.userId);
      if (submission.verdict === 'Accepted') {
        if (!userSolvedCount[submission.userId]) {
          userSolvedCount[submission.userId] = {
            user: submission.userId,
            solvedCount: 0,
          };
        }
        userSolvedCount[submission.userId].solvedCount += 1;
      }
    });

    const sortedUsers = Object.values(userSolvedCount).sort((a, b) => b.solvedCount - a.solvedCount);
    // console.log(sortedUsers);
    res.json(sortedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
