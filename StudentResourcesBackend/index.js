const express = require("express")
require("./src/Database")
const cookieParser = require("cookie-parser")
const {uploadRoute, getFileByID} = require("./src/Routes/file")
const {uploadMiddleware} = require("./src/Routes/file").middleWare
const {getAllProfBySearch, searchProfWithSchoolID, searchProf, createProf} = require("./src/Routes/prof")
const {createCourse, getCoursesByProfID} = require("./src/Routes/course")
const {createSchool, searchSchool, searchSchoolAll} = require("./src/Routes/school")
const authenticate = require("./src/Routes/authentication")
const redisCli = require("redis").createClient()
const session = require("express-session")
const redisStore = require('connect-redis')(session)
const cors = require("cors")
const sess = {
    secret: process.env.SESSION_SECRET,
    name: 'srid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000 // 1 Hour
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisCli, ttl: 86400 }),
}

redisCli.on('error', (err) => {
    console.log('Redis error: ', err);
});

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(["/createCourse", "/upload", "/createProf", "/createSchool"], session(sess))
app.use(cors())
app.listen(8080)

// Course Routes
app.post("/createCourse", authenticate, createCourse) // Create new course AUTHENTICATION REQUIRED
app.get("/getCoursesByProfID/:profID", getCoursesByProfID) // Get Courses by professor

// File Routes
app.post("/upload", authenticate, uploadMiddleware, uploadRoute) // Upload file AUTHENTICATION REQUIRED
app.get("/file/:ID", getFileByID) // Get file by ID

// Professor Routes
app.post("/createProf", authenticate, createProf) // Create new Professor AUTHENTICATION REQUIRED
app.get("/searchProfWithSchoolID/:schoolID/:searchTerm/", searchProfWithSchoolID) // Search for professor, With School ID
app.get("/searchProf/:searchTerm", searchProf) // Search for professors by search term limited to 8
app.get("/getAllProfBySearch/:searchTerm", getAllProfBySearch) // Search for professors by search term (All professors found)

// School Routes
app.post("/createSchool", authenticate, createSchool) // Create new School AUTHENTICATION REQUIRED
app.get("/searchSchool/:searchTerm", searchSchool) // Search for school limited to 8
app.get("/searchSchoolAll/:searchTerm", searchSchoolAll) // Search for professors by search term (All Schools found )