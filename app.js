// app.js
// import modules
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash') 

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


require('./config/mongoose')
const app = express()
const PORT = process.env.PORT

const usePassport = require('./config/passport')
const routes = require('./routes')
app.use(express.static('public'))
//hbs setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//登入session模組
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized:true
}))

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

//method-override
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app
usePassport(app)
//flash提示窗
app.use(flash())  // 掛載套件
//middleware
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
// route setting
app.use(routes)

// create server
app.listen(PORT, () => {
  console.log(`server listen to http://localhost:${PORT}`)
})