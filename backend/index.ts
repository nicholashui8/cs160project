export = {} //makes index.ts a module to avoid global scope
const express = require('express')
const app = express()
const connectDB = require('./db/connectDB')
const Student = require('./db/models/Student')

app.get('/', (req: any, res: any) => {
    res.send('Well done!')
})

app.listen(8000, () => {
    console.log('The application is listening on port 8000! Hello!')
})
//connects to database
connectDB()

//creates a new document in the 'student' collection
Student.create({ name: 'Nic', studentID: 324 })
