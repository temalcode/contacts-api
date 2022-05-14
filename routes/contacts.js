//express
const express = require('express')
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({extended: true}))
//model
const contactModel = require('../models/contactModel')
//middleawre
const authenticateUserMiddleware = require('../middleware/authenticateUser')
//cookie parser
const cookieParser = require('cookie-parser')
router.use(cookieParser())


router.get('/', authenticateUserMiddleware, async (req, res) => {
    try{
        let allContactsOfUser = await contactModel.find({owner: req.owner})
        if(!(allContactsOfUser.length === 0)){
            res.status(200).send(allContactsOfUser)
        } else{
            res.sendStatus(204)
        }
    } catch(err){
        res.status(500).send(err.message)
    }
})

router.get('/:id', authenticateUserMiddleware, async (req, res) => {
    try{
        let contact = await contactModel.findOne({owner: req.owner, _id: req.params.id})
        if(!(contact == null)){
            res.status(200).send(contact)
        } else{
            res.sendStatus(204)
        }
    } catch(err){
        res.status(500).send(err.message)
    }
})

router.post('/create', authenticateUserMiddleware, async (req, res) => {
    try{
        let newContact = new contactModel({
            name: req.body.name,
            phonenumber: req.body.phonenumber,
            owner: req.owner
        })
        let savedContact = await newContact.save()
        res.status(200).send(savedContact)
    } catch(err){
        res.status(400).send(err.message)
    }
})

router.delete('/delete/:id', authenticateUserMiddleware, async (req, res) => {
    try{
        let deletedContact = await contactModel.findByIdAndDelete(req.params.id)
        res.status(200).send(deletedContact)
    } catch(err){
        res.status(500).send(err.message)
    }
})

router.put('/edit/:id', authenticateUserMiddleware, async (req, res) => {
    try{
        let updatedContact = await contactModel.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                phonenumber: req.body.phonenumber
            },
            {
                new: true,
                runValidators: true 
            })
        res.status(200).send(updatedContact)
    } catch(err){
        res.status(500).send(err.message)
    }
})


module.exports = router