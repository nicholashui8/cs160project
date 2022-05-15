const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
    pointsRecieved: {
        type: Number,
        min: 0,
        required: false
    },

    courseId: {
        type: String,
        required: true
    },

    assignmentId: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true
    },

    submissionFile: {         // should store syllabus filename
        type: [String],
        required: false
    },
},
{
    timestamps:true
})

module.exports = mongoose.model('Submission', submissionSchema)