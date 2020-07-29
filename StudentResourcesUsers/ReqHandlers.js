require("./Database")
require("dotenv").config()
const argon2 = require("argon2")
const UserModel = require("./UserModel")
const redis = require('redis');
const redisClient = redis.createClient();

// TODO Handle user validation i.e. Make sure email is email, password has necessary parameters
const createUser = (req, res) => {
    const {username, email, password, schoolID} = req.body
    const lw = new RegExp("[a-z]") //Checks for lowercase chars
    const up = new RegExp("[A-Z]") //Checks for uppercase chars
    const dig = new RegExp("[0-9]") //Checks for Digits
    const error = {}
    error.password = error.username = []
    if (password.length < 6) error.password.concat("Must be longer than 6 characters")
    if (password.length > 30) error.password.concat("Must be shorter than 30 characters")
    if (!lw.test(password)) error.password.concat("Must contain a lowercase character")
    if (!up.test(password)) error.password.concat("Must contain an uppercase character")
    if (!dig.test(password)) error.password.concat("Must contain a number")
    if (username.length < 3) error.username.concat("Username must be longer than 3 characters")
    if (username.length > 20) error.username.concat("Username must be shorter than 20 characters")
    if (error.length > 0) return res.status(400).json({error});

    argon2.hash(password, {timeCost: 15, memoryCost: 2**16})
    .then(hashedPassword => {
        UserModel.create({
            username,
            email,
            password: hashedPassword,
            schoolID,
            createdAt: Date.now()
        })
        .then(doc => {
            req.session.userID = doc._id.toString()
            res.status(201).json({message: "Success"})
            console.log("Success: ", doc)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({error: err.code})
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })

}

const loginUser = (req, res, next) => {
    const {email, password} = req.body
    UserModel.findOne({email})
    .then(doc => {
        if (doc === null) {
            console.log("Password and Email Credentials do not match")
            return res.status(404).json({error: "Password and Email Credentials do not match"})
        }
        argon2.verify(doc.password, password)
        .then(validated => {
            if (validated) {
                req.userID = doc._id
                return next()
            }
            return res.status(404).json({error: "Password and Email Credentials do not match"})
        })
        .catch(err => {
            console.error(err)
            return res.status(500).json({error: "Something went wrong authenticating"})
        })
    })
    .catch(err => {
        return res.status(500).json({error: err})
    })

}

const finalLogin = (req, res) => {
    if (!req.session) return res.status(500).json({error: "No session found"})
    req.session.userID = req.userID
    if (req.body.stayLoggedIn) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 90
    return res.status(200).json({message: "success!"})
}
async function scanAsync(cursor, returnSet, pattern) {
    return new Promise((resolve, reject) => {
        redisClient.scan(cursor,"MATCH", pattern, "COUNT", 100, (err, reply) => {
            if (err) {
                console.log(err)
                reject(err);
            }
            cursor = reply[0]
            reply[1].forEach((key, i) => {
                returnSet.add(key)
            })
            if (cursor === "0") return resolve(Array.from(returnSet));
            else return scanAsync(cursor, returnSet, pattern)
        })
    })
}

const logoutUserEverywhere = (req, res) => {
    let rSet = new Set();
    const userID = req.headers.cookie.split("srid=s%3A")[1].split("_")[0]
    scanAsync(0, rSet, "*sess:" + userID + "_*", dbsize)
    .then(resolve => {
        resolve.forEach(key => {
            redisClient.del(key)
        })
        res.status(200).json({message: "success!"})
    })
    
}

const logoutUser = (req, res) => {
    
    if (!req.session.userID) {
        console.log("No user found")
        return res.status(400).json({message: "No user found"})
    }
    const uid = req.session.userID
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: err})
        }
        return res.status(200).json({message: "Logged out User " + uid})
    })
}

const checkUserSession = (req, res) => {
    
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    finalLogin,
    logoutUserEverywhere
}