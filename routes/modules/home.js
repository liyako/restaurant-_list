const express = require('express')
const router = express.Router()

const restaurant_list = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.userId
  return restaurant_list.find({ userId })
    .lean()
    .sort({ userId: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.render('error'))
})


module.exports = router