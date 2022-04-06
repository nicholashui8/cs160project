import { errorHandler } from './middleware/errorMiddleware'

const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const port = process.env.PORT || 9000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user-api', require('./routes/userRoutes'))
app.use('/course-api', require('./routes/courseRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

