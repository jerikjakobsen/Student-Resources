const mongoose = require("mongoose")

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect("mongodb://127.0.0.1:27017/ClassResources" )
        .then(()=> {
            console.log("Database: ClassResources\nServer: 127.0.0.1:ClassResources\nConnected")
        })
        .catch(err => {
            console.error(err)
        })
    }
}

module.exports = new Database()