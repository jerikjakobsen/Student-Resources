const mongoose = require("mongoose")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
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
        unique: true,
        validate: (value) => {
            return value.length > 3
        }
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
    createdAt: {
        required: true,
        type: Date
    }
})

module.exports = mongoose.model("Users", UserSchema)