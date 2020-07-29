const mongoose = require("mongoose")


const server = "127.0.0.1:27017"
const database = "ClassResources"

class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log("DB Connected")
        })
        .catch(err=> {
            console.error(err)
        })
    }
}

module.exports = new Database()