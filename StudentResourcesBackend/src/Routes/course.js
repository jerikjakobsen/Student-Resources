const CourseModel = require("../Models/CourseModel")

const createCourse = (req, res) => {
    const {name, code, professorID, schoolID} = req.body

    CourseModel.find({professorID, schoolID, name})
    .then(doc => {
        if (doc.length > 0) {
            console.error("Course already created")
            return res.status(409).json({error: "Course already created"})
        }

        CourseModel.create({
            name,
            code,
            professorID,
            schoolID
        })
        .then(doc => {
            return res.status(200).json({message: "success"})
        })
        .catch(err => {
            console.error(err)
            return res.sendStatus(500)
        })
    })
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })
}


const getCoursesByProfID = (req, res) => {
    const {profID} = req.params

    CourseModel.find({profID})
    .then(docs => {
        return res.status(200).json({courses: docs})
    })
    .catch(err => {
        res.sendStatus(500)
        return console.error(err)
    })

}


module.exports = {
    getCoursesByProfID,
    createCourse
}