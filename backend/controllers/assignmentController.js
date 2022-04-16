const asyncHandler = require('express-async-handler')

const Course = require('../models/courseModel')
const Assignment = require('../models/assignmentModel')

// @description     Create an assignment, 
// @route           POST /assignment-api/assignment
// @access          Public
const createAssignment = asyncHandler(async (req, res) => {
    const {assignmentId, assignmentName, courseId, courseName, courseSection, dueDate} = req.body

    if (!assignmentId || !assignmentName || !courseId || !courseName || !courseSection || !dueDate) {
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
        courseId,
        courseName,
        courseSection,
        dueDate
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

// @description     Get assignments from a course 
// @route           GET /assignment-api/course/assignments
// @access          Private
const getAssignmentsFromCourse = asyncHandler(async (req, res) => {
    const {courseId, courseName, sectionId} = req.body

    const course = await Course.findOne({courseId: courseId, courseName: courseName, sectionId: sectionId})

    if (!course) {
        res.status(400)
        throw new Error("Invalid Course Data")
    }

    const assignmentsFromCourse = []

    for (let index = 0; index < course.assignments.length; index++) {
        assignmentsFromCourse.push(await Assignment.findById(course.assignments[index]))
    }

    console.log(assignmentsFromCourse)
    
    res.status(200).json(assignmentsFromCourse)
})

module.exports = {
    createAssignment,
    getAssignmentsFromCourse
}