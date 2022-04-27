const mongoose = require('mongoose')

const submissionSchema = mongoose.Schema({
    pointsRecieved: {
        type: Number,
        min: 0,
        required: false
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Assignment'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Submission', submissionSchema)