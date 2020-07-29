const mongoose = require("mongoose")

const profSchema = new mongoose.Schema({
    name: {
        required: true,
        lowercase: true,
        type: String
    },
    schoolID: {
        required: true,
        type: String
    },
    schoolName: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model("Professor", profSchema)