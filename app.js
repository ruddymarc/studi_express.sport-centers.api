const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Import middlewares
const {
  welcome, login, guard
} = require('./middlewares')

// Import models
const models = require('./models')

// Import routers
const usersRouter = require('./routes/users')

const app = express()
app.set('models', models)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(welcome, login, guard)

app.use('/users', usersRouter)

module.exports = app
