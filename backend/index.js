require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DBConnection } = require("./database/db.js");
const authRoutes = require("./routes/auth.js");
const problemRoutes = require("./routes/problems.js");
const submissionRoutes = require("./routes/submissions.js");
const userRoutes = require("./routes/users.js");
const verifyToken = require("./middleware/auth.js");
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use("/api", authRoutes);
app.use("/api/problems", verifyToken, problemRoutes);
app.use("/api/submissions", verifyToken, submissionRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
