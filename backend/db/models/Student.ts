import mongoose from 'mongoose'

//example of how a student schema could look like
const StudentSchema = new mongoose.Schema({
    name: String,
    studentID: Number,
    courses: [{
        courseName: String,
        grade: Number,
        assignments: [{
            assignmentName: String,
            description: String,
            grade: Number,
        }],
    }]

})

module.exports = mongoose.model('Student', StudentSchema)