const asyncHandler = require('express-async-handler')
const fs = require('fs')

const Assignment = require('../models/assignmentModel')
const Course = require('../models/courseModel')
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')

// @description     Create a course 
// @route           POST /courses-api/course
// @access          Private
const createCourse = asyncHandler(async (req, res) => {
    const {courseId, sectionId, courseName, courseDescription, createdByEmail, createdById} = req.body
    const url = req.protocol + '://' + req.get('host')

    // check if the required fields have values
    if(!courseId || !sectionId || !courseName || !courseDescription || !createdByEmail || !createdById) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email: createdByEmail, schoolId: createdById})

    // check if user exists
    if (!userExists) {
        res.status(400)
        throw new Error("User does not exist")
    }

    const courseExists = await Course.findOne({courseId: courseId, sectionId: sectionId, courseName: courseName})

    // check if the course already exists
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
        createdById,
        syllabus: url + '/public/' + req.file.filename
    })

    if (!course) {
        res.status(400)
        throw new Error('Invalid course data')
    }

    // update the user.courses
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

// @description     Get a course from a user, for the course page
// @route           GET /course-api/user/course
// @access          Private
const getCourseFromUser = asyncHandler(async (req, res) => {
    const user = req.user

    const { id } = req.params
    
    // check if req.params has values defined
    if (!id) {
        res.status(400)
        throw new Error("Param value does not exist")
    }

    const course = await Course.findById(id)

    // check if course exists
    if (!course) {
        res.status(400)
        throw new Error('Course does not exist')
    }

    let totalPoints = 0
    let pointsRecieved = 0

    const assignments = []
    for (let index = 0; index < course.assignments.length; index++) {
        const assignment = await Assignment.findById(course.assignments[index])

        let assignmentGrade = null
        let submissionPoints = null

        for (let sub_index = 0; sub_index < assignment.submissions.length; sub_index++) {
            const submission = await Submission.findById(assignment.submissions[sub_index])
            
            const submission_user = await User.findById(submission.userId)
            if (submission_user.email === user.email) {
                if (submission.pointsRecieved) {
                    totalPoints += assignment.totalPointsPossible
                    pointsRecieved += submission.pointsRecieved
                    assignmentGrade = submission.pointsRecieved
                    submissionPoints = submission.pointsRecieved
                }
            }
        }

        const data = {assignment, submissionPoints, assignmentGrade: +((assignmentGrade/assignment.totalPointsPossible) * 100).toFixed(2)}
        assignments.push(data)
    }
    
    
    const courseInfo = {course, assignments, grade: +((pointsRecieved/totalPoints) * 100).toFixed(2)}
    
    //console.log(courseInfo)
    res.status(200).json(courseInfo)
})

// @description     Get courses from a user, for the home page
// @route           GET /course-api/user/courses
// @access          Private
const getCoursesFromUser = asyncHandler(async (req, res) => {
    const user = req.user
    
    const courses = []
    for (let index = 0; index < user.courses.length; index++) {
        const course = await Course.findById(user.courses[index])

        const assignments = []
        let totalPoints = 0
        let pointsRecieved = 0
        
        for (let sub_index = 0; sub_index < course.assignments.length; sub_index++) {
            const assignment = await Assignment.findById(course.assignments[sub_index])
            
            for (let submission_index = 0; submission_index < assignment.submissions.length; submission_index++) {
                const submission = await Submission.findById(assignment.submissions[submission_index])

                const submission_user = await User.findById(submission.userId)

                if (submission_user.email === user.email) {
                    if (submission.pointsRecieved) {
                        totalPoints += assignment.totalPointsPossible
                        pointsRecieved += submission.pointsRecieved
                    }
                }
            }

            assignments.push(assignment)
        }
        courses.push({course, assignments, grade: +((pointsRecieved/totalPoints) * 100).toFixed(2)})
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