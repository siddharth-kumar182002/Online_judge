const express = require("express");
const router = express.Router();
const User = require("../model/User.js");
const Submission = require("../model/submissions.js");
const verifyToken = require("../middleware/auth.js");






router.get('/get-friend', verifyToken, async (req, res) => {
    //console.log("inside get friends");
    try {
      const user = await User.findOne({ email: req.userId });
      //console.log(user);
  
      // Create an array of promises to fetch friend data and their problem count
      const friendPromises = user.friends.map(async friendEmail => {
        const friend = await User.findOne({ email: friendEmail });
              // console.log(friend);
        // Get the count of solved problems for this friend
        const solvedCount = friend.problemcount;
  
        return {
          user: friendEmail,
          solvedCount: solvedCount,
        };
      });
  
      // Wait for all friend data to be fetched
      const userFriends = await Promise.all(friendPromises);
  
      // Sort friends by their solved count in descending order
      const sortedFriends = userFriends.sort((a, b) => b.solvedCount - a.solvedCount);
  
     // console.log(sortedFriends);
      res.json(sortedFriends);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


// Get user by ID
router.get("/:userId", verifyToken, async (req, res) => {
   // console.log("inside users from search bar");
   // console.log(req.params.userId);
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

router.post('/add-friend', verifyToken, async (req, res) => {
    const { friendEmail } = req.body;

    try {
        const user = await User.findOne({ email: req.userId });
        const friend = await User.findOne({ email: friendEmail });

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        if (!user.friends.includes(friendEmail)) {
            user.friends.push(friendEmail);
            await user.save();
            res.json({ message: 'Friend added successfully' });
        } else {
            res.status(400).json({ message: 'Friend already added' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error adding friend', error: err.message });
    }
});

module.exports = router;
