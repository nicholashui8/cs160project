const express = require('express')
const router = express.Router()

const {
    createAssignment,
    getAssignmentsFromCourse
} = require('../controllers/assignmentController')

const { protect } = require('../middleware/authMiddleware')

router.post('/assignment', createAssignment)
router.get('/course/assignments', protect, getAssignmentsFromCourse)
module.exports = router