//express
const express = require('express')
const app = express()
//dotenv
const dotenv = require('dotenv')
dotenv.config()
//mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, () => console.log('connected to the database'))


//routes
const authRoute = require('./routes/auth')
const contactsRoute = require('./routes/contacts')
app.use('/users', authRoute)
app.use('/contacts', contactsRoute)

app.get('/', (req, res) => {
    res.status(200).send('Google Contacts Clone - Backend API')
})
//404
app.get("*", (req, res) => {
    res.status(404).send('resource is not found')
})


app.listen(process.env.PORT || 5000, () => console.log('server is running'))