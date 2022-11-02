const express = require('express')
const {createRentData, getRentData, deleteRantData, updateRentData} = require('../controllers/rentDataController')


const router = express.Router()

router.get('/', getRentData)

router.post('/', createRentData)

router.delete('/:id', deleteRantData)

router.patch('/:id', updateRentData)

module.exports = router