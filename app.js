// app.js
// import modules
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


require('./config/mongoose')
const app = express()
const port = 3000

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


// route setting
app.use(routes)

// create server
app.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})