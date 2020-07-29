require("dotenv").config()

const authenticateToken = (req, res, next) => {
    if (req.session.userID) {
        console.log(req.session.cookie._expires)
        req.session.touch()
        console.log(req.session.cookie._expires)
        return next();
    } 
    return res.sendStatus(403)
}

module.exports = authenticateToken