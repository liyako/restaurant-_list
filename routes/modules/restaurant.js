const express = require('express')
const Restaurant_list  = require('../../models/restaurant')

const router = express.Router()

//新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})
//新增到資料庫
router.post('/', (req, res) => {
  const { name, category,image, rating, location, phone, google_map, description } = req.body
  const restaurant = new Restaurant_list({
    name,
    category,
    image,
    location,
    google_map,
    phone,
    description,
    rating
  })
  return restaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
//查看特定一筆資料
router.get('/:id', (req, res) => {
  //const userId = req.user._id
  const _id = req.params.id
  return Restaurant_list.findOne({ _id })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => res.render('error'))
})
//資料修改頁面
router.get('/:id/edit', (req, res) => {
  //const userId = req.user._id
  const _id = req.params.id
  return Restaurant_list.findOne({_id})
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
//資料修改到資料庫
router.put('/:id', (req, res) => {
  //const userId = req.user._id
  const _id = req.params.id
  const { name, category,image, rating, location, phone, google_map, description } = req.body
  return Restaurant_list.findOne({ _id })
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.image = image
      restaurant.rating = rating
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${_id}`))
    .catch(error => res.render('error'))
})
//資料刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant_list.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router