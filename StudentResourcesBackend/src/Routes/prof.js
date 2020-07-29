const ProfModel = require("../Models/ProfModel")

const createProf = (req, res) => {
    const {profName, schoolID} = req.body
    const lowercaseName = profName.toLowerCase()
    ProfModel.findOne({name: lowercaseName})
    .then(doc => {
        if (doc) {
            res.status(409).json({error: "Document already created"})
            return console.error("Document already created")
        }
        ProfModel.create({
            name: profName,
            schoolID
        })
        .then(doc => {
            return res.status(201).json({message: "success"})
        })
        .catch(err => {
            res.sendStatus(500)
            return console.error(err)
        })
    }).catch(err => {
        res.sendStatus(500)
        return console.error(err)
    })
}

const searchProfWithSchoolID = (req, res) => {
    const {searchTerm, schoolID} = req.params
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
    ProfModel.find({schoolID, name: {$regex: searchTerm, $options: "i"}}).limit(8)
    .then(docs => {
        return res.status(200).json({professors: docs})
    })
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })


}

const searchProf = (req, res) => {
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
    ProfModel.find({ name: {$regex: searchTerm, $options: "i"}}).limit(8)
    .then(docs => {
        return res.status(200).json({professors: docs})
    })
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })

}

const getAllProfBySearch = (req, res) => {
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
    ProfModel.find({ name: {$regex: searchTerm, $options: "i"}})
    .then(docs => {
        return res.status(200).json({professors: docs})
    })
    .catch(err => {
        console.error(err)
        return res.sendStatus(500)
    })

}

module.exports = {
    createProf,
    searchProfWithSchoolID,
    searchProf,
    getAllProfBySearch
}