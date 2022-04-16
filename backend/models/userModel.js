const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    }, 

    userType: {
        type: String,
        required: [true, 'Please add userType: instructor or student']
    },
    
    schoolId: {
        type: String,
        required: [true, 'Please add a school ID']
    },

    email: {
        type: String,
        required: [true, 'Please add an email']
    },

    password: {
        type: String,
        required: [true, 'Please add a password']
    },

    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Course'
    },

    grades: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Grade'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) 