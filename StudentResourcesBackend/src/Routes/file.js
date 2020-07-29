require("../Database")
require("dotenv").config()
const FileModel = require("../Models/FileModel")
const multer = require("multer")
const fs = require('fs')
const cloud = require("cloudinary").v2
const {CLOUDINARY_API_KEY, CLOUD_NAME, CLOUD_SECRET} = process.env
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        const ending = () => {
            const code = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
            const rand = () => Math.floor(Math.random() * code.length)
            let string = ""
            for (let i = 0; i < 15; i ++) {
                string += code[rand()]
            }
            return string
      }
      cb(null, ending() + "-" + Date.now())
    }
  })

cloud.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUD_SECRET
})


const uploadMiddleware = multer({ storage }).single("uploadFile")

const uploadRoute = (req, res) => {

    const file = {
        title: req.body.title,
        courseID: req.body.courseID,
        type: req.body.type,
        semester: req.body.semester,
        authorID: req.body.authorID,
        anonymous: req.body.anonymous,
        tags: req.body.tags,
        fileURL: ""
    }
    // const testFile = {
    //     title: "quiz5",
    //     courseID: "1235",
    //     type: "dfgd",
    //     semester: "asd",
    //     authorID: "asd ",
    //     anonymous: false,
    //     tags: ["sdasd"],
    //     fileURL: ""
    // }

    FileModel.create(file)
        .then(doc => {
        cloud.uploader.upload(req.file.path, {
            public_id: "uploads/" + doc._id.toHexString()
        },
        (err, image) => {
            if (err) {
                FileModel.deleteOne({_id: doc.id})
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        res.sendStatus(500)
                        return console.error(err)
                    }
                })
                return console.error(err)
            }
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    res.sendStatus(500)
                    return console.error(err)
                }
            })
            FileModel.findByIdAndUpdate(doc._id, {fileURL: image.url}, (err, result) => {
                if (err) {
                    res.sendStatus(500)
                    return console.error(err)
                }
                return res.status(201).json({message: "Upload Successful"})
            })
        })
    })
}

const getFileByID = (req, res) => {
    const ID = req.params.ID
    if (!ID) {
        res.sendStatus(500)
        return console.error("No ID Found")

    }
    FileModel.findById(ID)
    .then(doc => {
        if (!doc) {
            res.sendStatus(404)
            return console.error("No file found")
        }
        const {
            title,
            courseID,
            type,
            semester,
            authorID,
            anonymous,
            tags,
            fileURL} = doc;

        res.status(200).json({
            title,
            courseID,
            type,
            semester,
            authorID: anonymous ? "" : authorID,
            anonymous,
            tags,
            fileURL
        })

    })
    .catch(err => {
        res.sendStatus(500)
        return console.error(err)
    })
}

module.exports = {
    uploadRoute,
    getFileByID,
    middleWare: {
        uploadMiddleware
    }
}