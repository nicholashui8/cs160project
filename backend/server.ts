import { errorHandler } from './middleware/errorMiddleware'

var express = require('express')
var dotenv = require('dotenv').config()
var connectDB = require('./config/connectDB')
var port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/course', require('./routes/courseRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

