const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {         // Name of the user
        type: String,
        required: [true, 'Please add a name']
    }, 

    userType: {     // Should be either student or instructor
        type: String,
        required: [true, 'Please add userType: instructor or student']
    },
    
    schoolId: {     // SchoolID: 1111111
        type: String,
        required: [true, 'Please add a school ID']
    },

    email: {        // user email: example@gmail.com
        type: String,
        required: [true, 'Please add an email']
    },

    password: {     // password of the account, will be hashed
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