const asyncHandler = require('express-async-handler')

const Assignment = require('../models/assignmentModel')
const Course = require('../models/courseModel')
const User = require('../models/userModel')

// @description     Create a course, 
// @route           POST /courses-api/course
// @access          Private
const createCourse = asyncHandler(async (req, res) => {
    const {courseId, sectionId, courseName, courseDescription, createdByEmail, createdById} = req.body

    if(!courseId || !sectionId || !courseName || !courseDescription || !createdByEmail || !createdById) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email: createdByEmail, schoolId: createdById})

    if (!userExists) {
        res.status(400)
        throw new Error("User does not exist")
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
    await User.findOneAndUpdate({schoolId: createdById, email: createdByEmail}, {$push: {"courses": course}}, {safe: true, upsert: true, new: true}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!user) {
            res.status(400)
            throw new Error('User not found')
        }

        return res.status(200).json({success:true, data: user})
    }).catch(err => console.log(err))

})

// @description     Get a course from a user, 
// @route           GET /course-api/user/course
// @access          Private
const getCourseFromUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    
    if (!id) {
        res.status(400)
        throw new Error("No course id exists")
    }

    const course = await Course.findById(id)
    const assignments = []

    for (let index = 0; index < course.assignments.length; index++) {
        assignments.push(await Assignment.findById(course.assignments[index]))
    }

    const courseInfo = {course, assignments}
    
    //console.log(courseInfo)

    res.status(200).json(courseInfo)
})

// @description     Get courses from a user, 
// @route           GET /course-api/user/courses
// @access          Private
const getCoursesFromUser = asyncHandler(async (req, res) => {
    const user = req.user
    
    const courses = []

    for (let index = 0; index < user.courses.length; index++) {
        const course = await(Course.findById(user.courses[index]))
        // console.log(index, course)

        const assignments = []
        for (let sub_index = 0; sub_index < course.assignments.length; sub_index++) {
            assignments.push(await Assignment.findById(course.assignments[sub_index]))
        }

        courses.push({course, assignments})

        //console.log(courses[index].course)
        //console.log(courses[index].assignments)
    }

    res.status(200).json(courses)
})


// worry about this later
const addCourseToUser = asyncHandler(async (req, res) => {
    
})

module.exports = {
    createCourse,
    getCourseFromUser,
    getCoursesFromUser
}