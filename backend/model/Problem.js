const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    testCases: [
        {
            input: String,
            output: String,
        },
    ],
    solution: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Problem", problemSchema);
