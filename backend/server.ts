import { errorHandler } from './middleware/errorMiddleware'

const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectDB')
const port = process.env.PORT || 9000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/user-api', require('./routes/userRoutes'))                // enables backend api calls involving user
app.use('/course-api', require('./routes/courseRoutes'))            // enables backend api calls for courses
app.use('/assignment-api', require('./routes/assignmentRoutes'))    // enables backend api calls for assignments
app.use('/submission-api', require('./routes/submissionRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

