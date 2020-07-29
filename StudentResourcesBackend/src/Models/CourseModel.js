const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    name: {
        required: true,
        lowercase: true,
        type: String
    },
    code: {
        required: false,
        lowercase: true,
        type: String
    },
    professorID: {
        required: true,
        type: String
    },
    schoolID: {
        required: true,
        type: String
    },
    difficulty: Number
})

module.exports = mongoose.model("Course", courseSchema)