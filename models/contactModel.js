
const mongoose = require('mongoose')

let contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    phonenumber: {
        type: Number,
        required: true,
        min: 10
    },
    owner: String, 
    dateAdded: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('contacts', contactSchema)