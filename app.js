// app.js
// import modules
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

const usePassport = require('./config/passport')
const routes = require('./routes')

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

//middleware
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// route setting
app.use(routes)

// create server
app.listen(PORT, () => {
  console.log(`server listen to http://localhost:${PORT}`)
})