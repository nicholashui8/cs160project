const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')

const Assignment = require('../models/assignmentModel')
const Course = require('../models/courseModel')
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')

// @description     Create a submission
// @route           POST /submission-api/submission-test
// @access          Public
const createSubmission = asyncHandler(async (req, res) => {
    const {assignmentId, userId} = req.body

    if (!assignmentId || !userId) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const user = await User.findById(userId)
    if (!user) {
        res.status(400)
        throw new Error("User does not exist")
    }

    const assignment = await Assignment.find(assignmentId)
    if (!assignment) {
        res.status(400)
        throw new Error("Assignment does not exist")
    }

    const submission = await Submission.create({
        assignmentId,
        userId
    })

    if (!submission) {
        res.status(400)
        throw new Error('Invalid submission data')
    }

    await Assignment.findByIdAndUpdate(assignmentId, {$push: {"submissions": submission}}, {safe: true, upsert: true, new: true}, (err, assignment) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!user) {
            res.status(400)
            throw new Error('Assignment not found')
        }

        return res.status(200).json({success:true, data: assignment})
    }).catch(err => console.log(err))
}) 

// @description     Create a submission for an assignment
// @route           POST /submission-api/submission
// @access          Private
const createAssignmentSubmission = asyncHandler (async (req, res) => {
    const user = req.user
    const url = `${req.protocol}://localhost:3000`

    const {courseId, assignmentId} = req.body

    if (!user) {
        res.status(400)
        throw new Error('User not signed in and authenticated')
    }

    if (!courseId || !assignmentId) {
        res.status(400)
        throw new Error('Missing Course/Assignment ID(s)')
    }

    const courseExists = await Course.findById(courseId)
    if(!courseExists) {
        res.status(400)
        throw new Error("Course does not exist")
    }

    const assignmentExists = await Assignment.findById(assignmentId)
    if(!assignmentExists) {
        res.status(400)
        throw new Error("Assignment does not exist")
    }

    const submission = await Submission.create({
        courseId,
        assignmentId,
        userEmail: user.email,
        submissionFile: `${url}/submissions/${req.file.filename}` // file name for the submission
    })

    if (!submission) {
        res.status(400)
        throw new Error('Invalid submission data')
    }

    // update the
    await Assignment.findByIdAndUpdate(assignmentId, {$push: {"submissions": submission}}, {safe: true, upsert: true, new: true})

    res.status(200).json({success:true, data: submission})
})

module.exports = {
    createSubmission,
    createAssignmentSubmission
}