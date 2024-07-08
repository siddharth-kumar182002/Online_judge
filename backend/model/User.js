const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
    },
    lastname: {
        type: String,
        default: null,
    },
    college:{
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    problemcount: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: null,
    },
    friends:{
        type: [String],
        default: null,
    }
    
});

module.exports = mongoose.model("user", userSchema);
