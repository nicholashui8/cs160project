const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseId: {         // ex) CS160
        type: String,
        required: [true, "Please add course id"]
    },

    sectionId: {        // ex) Section 1
        type: String,
        required: [true, "Please add the section id"]
    },

    courseName: {       // ex) Software Engineering
        type: String,
        required: [true, "Please add the name of the course"]
    },

    courseDescription: {// ex) This is a course
        type: String,
        required: [true, "Please add the description of the course"] 
    },

    createdByEmail: {
        type: String,
        required: true
    },

    createdById: {
        type: String,
        required: true
    },
    syllabus: {         // should store syllabus filename
        type: String,
        required: false
    },
    assignments: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Assignment' 
    }
},
{
    timestamps: true
})
module.exports = mongoose.model('Course', courseSchema)