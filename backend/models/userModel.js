const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
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
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) 