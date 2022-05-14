//express
const express = require('express')
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
//jwt
const jwt = require('jsonwebtoken')
//bcrypt
const bcrypt = require('bcrypt')
//model
const userModel = require('../models/userModel')
//dotenv
const dotenv = require('dotenv')
dotenv.config()


router.post('/signup', async (req, res) => {

        try{
            if (await userModel.findOne({ username: req.body.username })) {
                return res.status(400).send('username is already taken')
            }
            let hashedPassword = await bcrypt.hash(req.body.password, 10)
            let newUser = new userModel({
                name: req.body.name,
                username: req.body.username,
                password: hashedPassword
            })            
            let savedUser = await newUser.save()
            let { password, ...otherDetails } = savedUser.toJSON()
            res.status(200).send(otherDetails)

        } catch (err) {
            res.status(500).send(err.message)
        }
})

router.post('/login', async (req, res) => {
    try {
        let userProfile = await userModel.findOne({ username: req.body.username })
        if (userProfile) {
            bcrypt.compare(req.body.password, userProfile.password, (err, result) => {
                if (err) {
                    res.status(400).send(err.message)
                } else {
                    if (result) {
                        let jwtToken = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET,)
                        res.cookie('token', jwtToken, { httpOnly: true })
                        res.status(200).send('logged successfully')
                    } else {
                        res.status(400).send('password is wrong')
                    }
                }
            })
        } else {
            res.status(400).send('username is not found')
        }
    } catch (err) {
        res.send(err.message)
    }
})


module.exports = router