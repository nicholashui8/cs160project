import { errorHandler } from './middleware/errorMiddleware'

const connectDB = require('./config/connectDB')
const dotenv = require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 9000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('../frontend/public/assignmentFiles', express.static('assignmentFiles'))
app.use('../frontend/public/syllabi', express.static('syllabi'))
app.use('../frontend/public/submissions', express.static('submissions'))

app.use('/user-api', require('./routes/userRoutes'))                // enables backend api calls involving user
app.use('/course-api', require('./routes/courseRoutes'))            // enables backend api calls for courses
app.use('/assignment-api', require('./routes/assignmentRoutes'))    // enables backend api calls for assignments
app.use('/submission-api', require('./routes/submissionRoutes'))    // enables backend api calls for submissions

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))