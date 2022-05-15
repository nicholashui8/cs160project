const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    assignmentName: {           // name of the assignment ex) "Project Proposal"
        type: String,
        required: true
    },
    assignmentDescription: {    // description about the assignment
        type: String,
        required: true
    },
    courseId: {                 // ex) CS160
        type: String,
        required: true
    },
    courseName: {               // ex) Software Engineering 
        type: String,
        required: true
    },
    courseSection: {            // ex) Section 9
        type: String,
        required: true
    }, 
    dueDate: {                  // ex) When the assignment is due
        type: String,
        required: true
    },
    totalPointsPossible: {      // ex) 10
        type: Number,
        min: 1,
        default: 1,
        required: true
    },
    assignmentFile: {
        type: String,
        required: true
    },
    submissions: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Submission' 
    }

},
{
    timestamps:true
})

module.exports = mongoose.model('Assignment', assignmentSchema)