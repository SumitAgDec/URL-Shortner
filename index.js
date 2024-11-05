const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const { connectionDB } = require('./connect/connection')
const { restricToLoggedinUserOnly, checkAuth } = require("./middlewares/auth")
const URL = require('./model/url.model');

const userRoute = require('./router/user')
const urlRouter = require('./router/url')
const staticRouter = require('./router/staticRoute')

const app = express()
const port = 8001

// DB connection
connectionDB('mongodb://127.0.0.1:27017/URL-shortner')

// middleware
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))
app.use(cookieParser())

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// Router
app.use('/url', restricToLoggedinUserOnly, urlRouter)
app.use('/user', userRoute)
app.use('/', checkAuth, staticRouter)

app.listen(port, ()=> console.log(`Server is running at port: ${port}`))