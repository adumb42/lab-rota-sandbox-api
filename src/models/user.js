const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const User = mongoose.model('User', {
    userName: {
        type: String,
        default: null,
        useFindAndModify: false
    },
    fullNameOne: {
        type: String,
        default: null,
        useFindAndModify: false
    },
    crewNumber: {
        type: Number,
        default: null,
        useFindAndModify: false
    }  
})

module.exports = User

