const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rentDataSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    effectiveRent: {
        type: Number,
        required: true
    },
    startingRent: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('RentData', rentDataSchema)

