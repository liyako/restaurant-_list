const express = require('express')
const router = express.Router()


//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router