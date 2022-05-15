const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')

const Assignment = require('../models/assignmentModel')
const Course = require('../models/courseModel')
const ObjectId = require('mongoose').Types.ObjectId
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')

// @description     Create an assignment 
// @route           POST /assignment-api/assignment
// @access          Public
const createAssignment = asyncHandler(async (req, res) => {
    const user = req.user
    const url = `${req.protocol}://localhost:3000`

    const {assignmentName, points, dueDate, assignmentDescription, courseId} = req.body

    if (!assignmentName || !assignmentDescription || !points || !dueDate || !assignmentDescription) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    if (!user) {
        res.status(400)
        throw new Error('User not signed in and authenticated')
    }

    const course = await Course.findById(courseId)
    if(!course) {
        res.status(400)
        throw new Error("Course does not exist")
    }

    const assignmentExists = await Assignment.findOne({assignmentName: assignmentName, courseId: course.courseId})

    if(assignmentExists) {
        res.status(400)
        throw new Error("Assignment already exists")
    }

    const assignment = await Assignment.create({
        assignmentName,
        assignmentDescription,
        courseId: course.courseId,
        courseName: course.courseName,
        courseSection: course.sectionId,
        dueDate,
        totalPointsPossible: +points,
        assignmentFile: `${url}/assignmentFiles/${req.file.filename}`
    })

    if (!assignment) {
        res.status(400)
        throw new Error('Invalid assignment data')
    }

    await Course.findByIdAndUpdate(course._id, {$push: {"assignments": assignment}}, {safe: true, upsert: true, new: true})

    res.status(200).json({success:true, data: assignment})
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

// @description     Get all assignments from a course 
// @route           GET /assignment-api/course/:courseId/assignments
// @access          Private
const getAssignmentsFromCourse = asyncHandler(async (req, res) => {
    const user = req.user
    const { courseId } = req.params

    if (!user) {
        res.status(400)
        throw new Error('User not signed in and authenticated')
    }

    const course = await Course.findById(courseId)
    if (!course) {
        res.status(400)
        throw new Error('Course does not exist')
    }

    const assignments = []
    for (let index = 0; index < course.assignments.length; index++) {
        assignments.push(await Assignment.findById(course.assignments[index]))
    }

    res.status(200).json(assignments)
})

// @description     Delete assignment from course, should also remove all submissions and remove from the course, and delete
// @route           Delete /assignment-api/course/:courseId/delete/assignment/:assignmentId
// @access          Private
const deleteAssignment = asyncHandler(async (req, res) => {
    const user = req.user
    const {courseId, assignmentId} = req.params

    if (!user) {
        res.status(400)
        throw new Error('User not signed in and authenticated')
    }

    let course = await Course.findById(courseId)
    if (!course) {
        res.status(400)
        throw new Error('Course does not exist')
    }

    const assignment = await Assignment.findById(assignmentId)
    if (!assignment) {
        res.status(400)
        throw new Error('Assignment does not exist')
    }

    const submissions = assignment.submissions
    for (let index = 0; submissions && index < submissions.length; index++) {
        await Assignment.findByIdAndUpdate(assignmentId, {$pull: {"submissions": new ObjectId(submissions[index])}}, {safe: true, upsert: true, new: true})
        await Submission.findByIdAndDelete(submissions[index])
    }

    await Course.findByIdAndUpdate(courseId, {$pull: {"assignments": new ObjectId(assignmentId)}}, {safe: true, upsert: true, new: true})
    await Assignment.findByIdAndDelete(assignmentId)

    course = await Course.findById(courseId)
    res.status(200).json({success: true, data: course})

})
module.exports = {
    createAssignment,
    deleteAssignment,
    getAssignmentsFromCourse,
    getAssignmentFromCourse
}