const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    assingmentID: {
        type: String,
        required: true
    },
    assignmentName: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Assignment', assignmentSchema)