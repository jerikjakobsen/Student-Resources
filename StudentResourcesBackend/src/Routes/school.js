const SchoolModel = require("../Models/SchoolModel")

const createSchool = (req, res) => {
    const {name, nickname, country, state, city, schoolWebsite} = req.body

    SchoolModel.find({name, country, city})
    .then(docs => {
        if (docs.length > 0) {
            console.error("School is already created")
            return res.status(400).json({error: "School is already created"})
        }

        SchoolModel.create({
            name,
            nickname,
            country,
            state,
            city,
            schoolWebsite
        })
        .then(doc => {
            return res.status(201).json({message: "success"})
        })
        .catch(err => {
            console.error(err)
            return res.sendStatus(500)
        })
    })
}

const searchSchool = (req, res) => {
    const {searchTerm} = req.params
    if (searchTerm.length < 2) {
        console.error("Search term must be longer than 1 letter")
        return res.status(400).json({message: "Search term must be longer than 1 letter"})
    }
    const ignore = ["a", "an", "the", "for", "and", "that", "of"]
    let ignored = false
    let searchTermSplit = searchTerm.split(" ")
    for (let i=0; i < ignore.length; i++) {
        if (ignore[i] === searchTermSplit[0]) {
            ignored = true
        }
    }
    if (searchTermSplit.length === 1 && ignored) {
        console.error("Cannot be apart of ignored words")
        return res.status(400).json({message: "Cannot be apart of ignored words"})
    }

    SchoolModel.find({name: {$regex: searchTerm, $options: "i"}}).limit(8)
    .then(docs => {
        return res.status(200).json({schools: docs})
    })
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })
}

const searchSchoolAll = (req, res) => {
    const {searchTerm} = req.params
    if (searchTerm.length < 2) {
        console.error("Search term must be longer than 1 letter")
        return res.status(400).json({message: "Search term must be longer than 1 letter"})
    }
    const ignore = ["a", "an", "the", "for", "and", "that", "of"]
    let ignored = false
    let searchTermSplit = searchTerm.split(" ")
    for (let i=0; i < ignore.length; i++) {
        if (ignore[i] === searchTermSplit[0]) {
            ignored = true
        }
    }
    if (searchTermSplit.length === 1 && ignored) {
        console.error("Cannot be apart of ignored words")
        return res.status(400).json({message: "Cannot be apart of ignored words"})
    }

    SchoolModel.find({name: {$regex: searchTerm, $options: "i"}})
    .then(docs => {
        return res.status(200).json({schools: docs})
    })
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })
}

module.exports = {
    createSchool,
    searchSchool,
    searchSchoolAll
}