const mongoose = require("mongoose")

// School Open Data Set https://hifld-geoplatform.opendata.arcgis.com/datasets/colleges-and-universities/data
const schoolModel = mongoose.Schema({
    name: {
        required: true,
        lowercase: true,
        type: String
    },
    nickname: {
        required: false,
        lowercase: true,
        type: Array
    },
    country: {
        required: true,
        lowercase: true,
        type: String
    },
    state: {
        required: false,
        lowercase: true,
        type: String
    },
    city: {
        required: true,
        lowercase: true,
        type: String
    },
    schoolWebsite: {
        required: false,
        lowercase: true,
        type: String
    }
})

module.exports = mongoose.model("School", schoolModel)