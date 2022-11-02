const RentData = require('../models/rentDataModel')
const mongoose = require('mongoose')

// get all rent data
const getRentData = async (req, res) => {
    const rentData = await RentData.find({}).sort({year: 1})

    res.status(200).json(rentData)
}

// create a new rent data
const createRentData = async (req, res) => {
    const {year, effectiveRent, startingRent} = req.body

    try {
        const rentData = await RentData.create({year, effectiveRent, startingRent})
        res.status(200).json(rentData)
    } catch (err) {
        res.status(400).json({error: error.message})
    }
}

// delete a rent data
const deleteRantData = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such rent data'})
    }

    const rentData = await RentData.findOneAndDelete({_id: id})

    if (!rentData) {
        return res.status(400).json({error: 'No such rent data'})
    }

    res.status(200).json(rentData)
}

// update a rent data
const updateRentData = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such rent data'})
    }

    const rentData = await RentData.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!rentData) {
        return res.status(400).json({error: 'No such rent data'})
    }

    res.status(200).json(rentData)
}

module.exports = {
    getRentData,
    createRentData,
    deleteRantData,
    updateRentData
}