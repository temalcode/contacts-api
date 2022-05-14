//jwt
const jwt = require('jsonwebtoken')
//dotenv
const dotenv = require('dotenv')
dotenv.config()


function authenticateUser(req, res, next){
    try{
        let jwttoken = req.cookies.token

        jwt.verify(jwttoken, process.env.JWT_SECRET, (err, user) => {
            if(err){
                res.status(400).send(err.message)
            } else{
                req.owner = user.username
                next()
            }
        })
    } catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = authenticateUser 