const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Problem = require('../model/Problem.js');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const addProblems = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');

        //Function to read test case files
        const readTestCases = (folderPath) => {
            const testCases = [];
            let index = 1;

            while (true) {
                const inputFilePath = path.join(folderPath, `testcase${index}_input.txt`);
                const outputFilePath = path.join(folderPath, `testcase${index}_output.txt`);

                if (fs.existsSync(inputFilePath) && fs.existsSync(outputFilePath)) {
                    const input = fs.readFileSync(inputFilePath, 'utf-8').trim();
                    const output = fs.readFileSync(outputFilePath, 'utf-8').trim();
                    testCases.push({ input, output });
                    index++;
                } else {
                    break;
                }
            }

            return testCases;
        };

        // Read test cases from the folder
        const folderPath = path.join(__dirname, 'testcases');
        const testCases = readTestCases(folderPath);

        const problems = [
            {
                name: 'even or odd',
                description: 'print even if given number is even else print odd',
                testCases,
                solution: '#include <iostream>\nint main() {\n    int n;\n    std::cin >> n;\n    for (int i = 1; i <= n; ++i) {\n        std::cout << i << " ";\n    }\n    return 0;\n}',
            }
            // Add more problems as needed
        ];
        //console.log(testCases);
        await Problem.insertMany(problems);
        console.log('Problems added successfully');
        mongoose.disconnect();
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
        mongoose.disconnect();
    }
};

addProblems();
