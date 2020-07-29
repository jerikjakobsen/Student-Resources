const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    schoolID: {
        type: String,
        required: false
    },
    setDefaultSchool: Boolean,
    createdAt: Date
})

// Mongoose Model has the name of the collection and the schema that defines it

module.exports = mongoose.model("User", userSchema)