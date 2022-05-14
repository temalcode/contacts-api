
const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 100
    },
    username: {
        type: String,
        requried: true,
        unique: true,
        minLength: 3
    },
    password: {
        type: String,
        requried: true,
        minLength: 10,
        maxLength: 100
    },
    dateJoined: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('users', userSchema)