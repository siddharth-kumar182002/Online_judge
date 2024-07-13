const express = require("express");
const router = express.Router();
const Problem = require("../model/Problem.js");
const { generateFile } = require("../generateFiles.js");
const { compileCpp, executeCpp } = require("../executeCpp.js");

// Get all problems
router.get("/", async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// Get a specific problem by ID
router.get("/:id", async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).send("Problem not found");
        }
        res.json(problem);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

// Submit code
router.post("/:id", async (req, res) => {
    console.log("problem");
    const { language = 'cpp', code } = req.body;
    if (!code) {
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        const problem = await Problem.findById(req.params.id).populate('testCases');
        if (!problem) {
            return res.status(404).send("Problem not found");
        }

        const filePath = await generateFile(language, code);
        const executablePath = await compileCpp(filePath);
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
            const actualOutput = await executeCpp(executablePath, input);
        
            const normalizedActualOutput = normalizeOutput(actualOutput);
            const normalizedExpectedOutput = normalizeOutput(expectedOutput);
        
            //console.log(normalizedActualOutput);
            //console.log(normalizedExpectedOutput);
        
            return {
                input,
                expectedOutput,
                actualOutput: actualOutput.trim(),
                success: normalizedActualOutput === normalizedExpectedOutput,
            };
        }));
        

        const success = outputs.every(output => output.success);

        res.json({
            filePath,
            outputs,
            success,
            verdict: success ? 'Accepted' : 'Wrong Answer',
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
