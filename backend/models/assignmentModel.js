const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    assignmentId: {     // asignmentID, maybe use documentID as its ID
        type: String,
        required: true
    },
    assignmentName: {   // name of the assignment ex) "Project Proposal"
        type: String,
        required: true
    },
    courseId: {         // ex) CS160
        type: String,
        required: true
    },
    courseName: {       // ex) Software Engineering 
        type: String,
        required: true
    },
    courseSection: {    // ex) Section 9
        type: String,
        required: true
    }, 
    dueDate: {          // ex) When the assignment is due
        type: String,
        required: true
    },
    // potentially store a pdf file? Similar to canvas?
})
module.exports = mongoose.model('Assignment', assignmentSchema)