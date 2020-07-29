const express = require("express")
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const {createUser, loginUser, logoutUser, finalLogin, logoutUserEverywhere} = require("./ReqHandlers")
const {v4} = require("uuid")

const app = express()
app.use(express.json())

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

// Routes after this will create a Session
const sess = {
    secret: process.env.SESSION_SECRET,
    name: 'srid',
    resave: false,
    saveUninitialized: false,
    genid: (req) => {
        return req.userID + "_" + v4()
    },
    cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000 // 1 Hour
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
}


app.listen(8000)

app.post("/createUser", session(sess), createUser) // Create a new user

app.post("/login", loginUser, session(sess), finalLogin) // Login a user by authenticating them

app.post("/logout", logoutUser) // Delete Session so user must log in again

app.post("/logoutAll", logoutUserEverywhere)