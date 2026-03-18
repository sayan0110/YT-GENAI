const mongoose = require('mongoose')

const logoutSchema = new mongoose.Schema({
    token: {
        type: String,
    }
}, {
    timestamps: true
})
const blocklistedModel = mongoose.model("blockedToken", logoutSchema)
module.exports = blocklistedModel;