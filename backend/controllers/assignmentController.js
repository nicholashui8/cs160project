const asyncHandler = require('express-async-handler')

const Assignment = require('../models/assignmentModel')
const Course = require('../models/courseModel')
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')

// @description     Create an assignment 
// @route           POST /assignment-api/assignment
// @access          Public
const createAssignment = asyncHandler(async (req, res) => {
    const {assignmentId, assignmentName, assignmentDescription, courseId, courseName, courseSection, dueDate, totalPointsPossible} = req.body

    if (!assignmentId || !assignmentName || !assignmentDescription || !courseId || !courseName || !courseSection || !dueDate || !totalPointsPossible) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const courseExists = await Course.findOne({courseId: courseId, courseName: courseName, sectionId: courseSection})

    if(!courseExists) {
        res.status(400)
        throw new Error("Course does not exist")
    }

    const assignmentExists = await Assignment.findOne({assignmentId: assignmentId, assignmentName: assignmentName, courseId: courseId, courseName: courseName, courseSection: courseSection})

    if(assignmentExists) {
        res.status(400)
        throw new Error("Assignment already exists")
    }

    const assignment = await Assignment.create({
        assignmentId,
        assignmentName,
        assignmentDescription,
        courseId,
        courseName,
        courseSection,
        dueDate,
        totalPointsPossible
    })

    if (!assignment) {
        res.status(400)
        throw new Error('Invalid assignment data')
    }

    await Course.findOneAndUpdate({courseId: courseId, courseName: courseName, sectionId: courseSection}, {$push: {"assignments": assignment}}, {safe: true, upsert: true, new: true}, (err, course) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!course) {
            res.status(400)
            throw new Error('Course not found')
        }
        
        return res.status(200).json({success: true, data: course})
    }).catch(err => console.log(err))

})

// @description     Get assignment from a course 
// @route           GET /assignment-api/course/:courseId/assignments/:assignmentId
// @access          Private
const getAssignmentFromCourse = asyncHandler(async (req, res) => {
    const user = req.user
    const { courseId, assignmentId } = req.params

    // check if req.params has values defined
    if (!courseId || !assignmentId) {
        res.status(400)
        throw new Error("Param values are missing")
    }

    const course = await Course.findById(courseId)

    // Check if course exists 
    if (!course) {
        res.status(400)
        throw new Error("Course does not exist")
    }

    const assignment = await Assignment.findById(assignmentId)
    let isSubmitted = false

    // Check if assignment exists
    if (!assignment) {
        res.status(400)
        throw new Error("Assignment does not exist")
    }

    // check if assignment matches corresponding course data
    if (
        assignment.courseId !== course.courseId ||
        assignment.courseSection !== course.sectionId ||
        assignment.courseName !== course.courseName
    ) {
        res.status(400)
        throw new Error("Assignment does not belong in the Course")
    }

    for (let index = 0; index < assignment.submissions.length; index++) {
        const submission = await Submission.findById(assignment.submissions[index])
        
        if (submission.userEmail === user.email) {
            isSubmitted = true
        }

    }

    // console.log(assignment)
   
    res.status(200).json({assignment, isSubmitted})    // return assignment data if matches to course
})

module.exports = {
    createAssignment,
    getAssignmentFromCourse
}