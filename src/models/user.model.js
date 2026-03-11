const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "userName already registered"],
        require: true
    },
    email: {
        type: String,
        unique: [true, "email already ecist"],
        require: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel;