const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    courseID: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        lowercase: true
    },
    semester: {
        type: String,
        lowercase: true
    },
    authorID: {
        type: String,
        required: true
    },
    anonymous: {
        type: Boolean,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    fileURL: String 
})

module.exports = mongoose.model("File", fileSchema)