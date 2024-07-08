const express = require("express");
const router = express.Router();
const Problem = require("../model/Problem.js");
const Submission = require("../model/submissions.js");
const { generateFile } = require("../generateFiles");
const { compileCpp, executeCpp } = require("../executeCpp");
const User = require("../model/User.js");

// Get all submissions for the logged-in user
router.get("/", async (req, res) => {
    //console.log(req.userId);
    try {
        const user = await User.find({email:req.userId});
        if (!user) {
            return res.status(404).send("User not found");
        }
        const submissions = await Submission.find({ userId: req.userId }).populate('problemId');
       
        res.json({ user, submissions });
    } catch (error) {
        console.error("Error fetching user submissions:", error);
        res.status(500).send("Server Error");
    }
});

// Submit code
router.post("/:id", async (req, res) => {
    const {language = 'cpp', code } = req.body;
    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        const problem = await Problem.findById(req.params.id).populate('testCases');
        if (!problem) {
            return res.status(404).send("Problem not found");
        }

        // Generate the file for the provided code
        const filePath = await generateFile(language, code);
        // Compile the generated file
        const executablePath = await compileCpp(filePath);
        // Execute the compiled file with each test case input
        const normalizeOutput = (output) => {
            return output
                .trim()
                .replace(/\r\n/g, '\n') // Replace Windows newlines with Unix newlines
                .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
                .replace(/\n\s+/g, '\n'); // Remove spaces following a newline
        };

        const outputs = await Promise.all(problem.testCases.map(async (testCase) => {
            const input = testCase.input;
            const expectedOutput = testCase.output;
            const actualOutput = await executeCpp(executablePath, input); // Pass the input to the executable
            const normalizedActualOutput = normalizeOutput(actualOutput);
            const normalizedExpectedOutput = normalizeOutput(expectedOutput);

            return {
                input,
                expectedOutput,
                actualOutput: actualOutput.trim(), // Trim the actual output
                success:  normalizedActualOutput === normalizedExpectedOutput, // Compare the trimmed outputs
            };
        }));

        // Determine the overall success of the submission
        const success = outputs.every(output => output.success);

        // Save the submission to the database
        const submission = new Submission({
            userId: req.userId,
            problemId: req.params.id,
            code,
            verdict: success ? 'Accepted' : 'Wrong Answer',
        });

        await submission.save();

        res.json({
            filePath,
            outputs,
            success,
            verdict: success ? 'Accepted' : 'Wrong Answer',
        });
    } catch (error) {
        console.error("Error processing submission:", error);
        res.status(500).json({ error });
    }
});

module.exports = router;
