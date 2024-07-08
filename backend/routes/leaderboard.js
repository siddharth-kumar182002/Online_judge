// backend/routes/leaderboard.js
const express = require('express');
const router = express.Router();
const Submission = require('../model/submissions.js');
const User = require('../model/User.js'); // Assuming you have a user model

router.get('/', async (req, res) => {
    console.log("inside leaderboard");
  try {
    const users = await User.find();
      console.log(users);
  
      // Create an array of promises to fetch friend data and their problem count
      const userprocount = users.map(user => {
        return {
          user: user.email,
          solvedCount: user.problemcount,
        };
      });
  
      // Sort friends by their solved count in descending order
      const sortedUsers = userprocount.sort((a, b) => b.solvedCount - a.solvedCount);
  
      console.log(sortedUsers);
      res.json(sortedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
