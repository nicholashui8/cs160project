const asyncHandler = require('express-async-handler')

const Course = require('../models/courseModel')
const User = require('../models/userModel')

// @description     Create a course, 
// @route           POST /courses-api/course
// @access          Public
const createCourse = asyncHandler(async (req, res) => {
    const {courseId, sectionId, courseName, courseDescription, createdByEmail, createdById} = req.body

    if(!courseId || !sectionId || !courseName || !courseDescription || !createdByEmail || !createdById) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const courseExists = await Course.findOne({courseId: courseId, sectionId: sectionId, courseName: courseName})

    if(courseExists) {
        res.status(400)
        throw new Error("Course already exists")
    }

    const course = await Course.create({
        courseId,
        sectionId,
        courseName,
        courseDescription,
        createdByEmail,     
        createdById         
    })


    if (!course) {
        res.status(400)
        throw new Error('Invalid course data')
    }

    // req.user.id
    await User.findByIdAndUpdate(req.params.id, {$push: {"courses": course}}, {safe: true, upsert: true, new: true}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!user) {
            return res.status(400).json({success: false, error: 'User not found'})
        }

        return res.status(200).json({success:true, data: user})
    }).catch(err => console.log(err))

})

// @description     Get courses from a user, 
// @route           POST /course-api/user/courses
// @access          Private
const getCoursesFromUser = asyncHandler(async (req, res) => {
    const user = req.user
    
    const courses = []

    for (let index = 0; index < user.courses.length; index++) {
        courses.push(await Course.findById(user.courses[index]))
    }

    res.status(200).json(courses)
})


// worry about this later
const addCourseToUser = asyncHandler(async (req, res) => {
    
})

module.exports = {
    createCourse,
    getCoursesFromUser
}