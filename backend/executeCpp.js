const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Define the path to the outputs directory
const outputPath = path.join(__dirname, "outputs");

// Create the outputs directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Function to compile C++ code
const compileCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error("Compilation error:", error);
                return reject({ error, stderr });
            }
            if (stderr) {
                console.error("Compilation stderr:", stderr);
                return reject(stderr);
            }
            resolve(outPath); // Return the path of the compiled executable
        });
    });
};

// Function to execute the compiled C++ code with given input
const executeCpp = (executablePath, input) => {
    return new Promise((resolve, reject) => {
        // Add a delay before execution
            const execCommand = `${path.join(outputPath, path.basename(executablePath))}`;
            const process = exec(execCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error("Execution error:", error);
                    return reject({ error, stderr });
                }
                if (stderr) {
                    console.error("Execution stderr:", stderr);
                    return reject(stderr);
                }
                resolve(stdout); // Return the output of the executable
            });

            // Pass the input to the executable
            process.stdin.write(input + "\n");
            process.stdin.end();
        
    });
};

module.exports = {
    compileCpp,
    executeCpp,
};
