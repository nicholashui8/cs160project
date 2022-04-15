const asyncHandler = require('express-async-handler')

const Course = require('../models/courseModel')
const Assignment = require('../model/assignmentModel')

// @description     Create an assignment, 
// @route           POST /assignment-api/assignment
// @access          Public
const createAssignment = asyncHandler(async (req, res) => {
    
})