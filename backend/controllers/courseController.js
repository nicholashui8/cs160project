const asyncHandler = require('express-async-handler')
const fs = require('fs')
const path = require('path')

const Assignment = require('../models/assignmentModel')
const Course = require('../models/courseModel')
const ObjectId = require('mongoose').Types.ObjectId
const Submission = require('../models/submissionModel')
const User = require('../models/userModel')

// @description     Create a course 
// @route           POST /courses-api/course
// @access          Private
const createCourse = asyncHandler(async (req, res) => {
    const user = req.user

    const {courseId, sectionId, courseName, courseDescription, courseRoom, courseDates, startTime, endTime} = req.body
    const url = `${req.protocol}://localhost:3000`

    // check if the required fields have values
    if(!courseId || !sectionId || !courseName || !courseDescription || !courseRoom || !courseDates || !startTime || !endTime) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email: user.email, schoolId: user.schoolId})

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
        courseRoom,
        courseDates,
        startTime,
        endTime,
        instructorName: user.name,
        createdByEmail: user.email,     
        createdById: user.schoolId,
        syllabus: `${url}/syllabi/${req.file.filename}` //'/backend/public/' + req.file.filename    //url + '/public/' + req.file.filename
    })

    if (!course) {
        res.status(400)
        throw new Error('Invalid course data')
    }

    // update the user.courses
    await User.findOneAndUpdate({schoolId: user.schoolId, email: user.email}, {$push: {"courses": course}})

    res.status(200).json({success:true, data: user})
})

// @description     Get a course from a user, for the course page
// @route           GET /course-api/user/course/:id
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

    //const syllabusPath = path.join(__dirname, `../../${course.syllabus}`)

    let totalPoints = 0
    let pointsRecieved = 0

    const assignments = []
    for (let index = 0; index < course.assignments.length; index++) {
        const assignment = await Assignment.findById(course.assignments[index])

        let assignmentGrade = null
        let submissionPoints = null
        let isSubmitted = false
        for (let sub_index = 0; sub_index < assignment.submissions.length; sub_index++) {
            const submission = await Submission.findById(assignment.submissions[sub_index])
            
            if (submission.userEmail === user.email) {
                if (submission.pointsRecieved) {
                    totalPoints += assignment.totalPointsPossible
                    pointsRecieved += submission.pointsRecieved
                    assignmentGrade = submission.pointsRecieved
                    submissionPoints = submission.pointsRecieved
                }
                isSubmitted = true
            }
        }

        const data = {assignment, isSubmitted, submissionPoints, assignmentGrade: +((assignmentGrade/assignment.totalPointsPossible) * 100).toFixed(2)}
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

                if (submission.userEmail === user.email) {
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

// @description     Get courses that the user is not enrolled in
// @route           GET /course-api/user/courses-not-enrolled
// @access          Private
const getCoursesNotEnrolledIn = asyncHandler(async (req, res) => {
    const user = req.user

    const courses = await Course.find()
    // const coursesNotEnrolled = []

    for (let index = 0; index < courses.length; index++) {
        if (user.courses.includes(courses[index]._id)) {
            courses.splice(index, 1)
            index--
        }
    }
    // console.log(courses.length)
    res.status(200).json(courses)
})

// @description     Enroll user in course(s)
// @route           PUT /course-api/user/courses-enroll
// @access          Private
const addCoursesToUser = asyncHandler(async (req, res) => {
    const body = req.body
    // console.log(body)
    const user = req.user

    for (let key in body) {
        if(body[key] !== '') {
            const course = await Course.findById(body[key])

            await User.findByIdAndUpdate(user._id, {$push: {"courses": course}}, {safe: true, upsert: true, new: true})
        }
    }

    res.status(200).json({success:true, data:user})
})

// @description     Drop course(s) from user
// @route           PUT /course-api/user/courses-drop
// @access          Private
const dropCoursesFromUser = asyncHandler(async (req, res) => {
    const body = req.body
    // console.log(body)
    const user = req.user

    for (let key in body) {
        if(body[key] !== '') {
            await User.findByIdAndUpdate(user._id, {$pull: {"courses": new ObjectId(body[key])}}, {safe: true, upsert: true, new: true})
        }
    }

    res.status(200).json({success:true, data:user})
})

// @description     Delete course(s) from instructor, should also remove all submissions, and assignments that were created as well
// @route           Delete /course-api/user/courses-delete/:courseId
// @access          Private
const deleteCourse = asyncHandler(async (req, res) => {
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

    /** Multi-step process of deleting a course
     *  1. delete all submissions from each course assignment
     *  2. deleate all assignments from the courese
     *  3. remove the course reference from both instructor and student
     *  4. delete the course
     */
    const assignments = course.assignments    
    for (let index = 0; assignments && index < assignments.length; index++) {
        
        const submissions = assignments[index].submissions
        for (let sub_index = 0; submissions && sub_index < submissions.length; sub_index++) {
            await Assignment.findByIdAndUpdate(assignments[index], {$pull: {"submissions": new ObjectId(submissions[sub_index])}}, {safe: true, upsert: true, new: true})
            await Submission.findByIdAndDelete(submissions[sub_index])
        }

        await Course.findByIdAndUpdate(courseId, {$pull: {"assignments": new ObjectId(assignments[index])}}, {safe: true, upsert: true, new: true})
        await Assignment.findByIdAndDelete(assignments[index])
    }

    const users = await User.find()
    for (let user_index = 0; user_index < users.length; user_index++) {
        if (user.courses.includes(courseId)) {
            await User.findByIdAndUpdate(users[user_index]._id, {$pull: {"courses": new ObjectId(courseId)}}, {safe: true, upsert: true, new: true})
        }
    }

    //await User.findByIdAndUpdate(user._id, {$pull: {"courses": new ObjectId(courseId)}}, {safe: true, upsert: true, new: true})
    await Course.findByIdAndDelete(courseId)

    const instructor = await User.findById(user._id)
    res.status(200).json({success: true, data: instructor})
})

module.exports = {
    addCoursesToUser,
    createCourse,
    deleteCourse,
    dropCoursesFromUser,
    getCourseFromUser,
    getCoursesFromUser,
    getCoursesNotEnrolledIn
}