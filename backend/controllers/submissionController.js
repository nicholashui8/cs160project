const asyncHandler = require('express-async-handler')

const Assignment = require('../models/assignmentModel')
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')

// @description     Create a submission
// @route           POST /submission-api/submission
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

    const assignment = await Assignment.findById(assignmentId)
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

module.exports = {
    createSubmission
}