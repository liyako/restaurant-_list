const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')


// route setting
router.use('/restaurant', restaurant)
router.use('/', home)


module.exports = router