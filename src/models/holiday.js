const mongoose = require('mongoose')

const Holiday = mongoose.model('Holiday', {
    date: {
        type: String
    },
    day: {
        type: String
    },
    crewOne: {
        type: Boolean
    },
    crewTwo: {
        type: Boolean
    },
    crewThree: {
        type: Boolean
    },
    crewFour: {
        type: Boolean
    },
    crewFive: {
        type: Boolean
    },
    id: {
        type: Number
    },
    crewOneBench: {
        type: Number
    },
    crewTwoBench: {
        type: Number
    },
    crewThreeBench: {
        type: Number
    },
    crewFourBench: {
        type: Number
    },
    crewFiveBench: {
        type: Number
    }
})

module.exports = Holiday
