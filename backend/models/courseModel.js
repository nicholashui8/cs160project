const mongoose = require('moongose')

const courseSchema = mongoose.Schema({
    courseID: {
        type: String,
        required: true
    },

    courseName: {
        type: String,
        required: true
    },

    courseDescription: {
        type: String,
        required: true 
    },

    createdBy: {
        type: String,
        required: true
    },

    assignments: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Assignment' 
    }
})
module.exports = mongoose.model('Course', courseSchema)