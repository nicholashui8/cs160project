const express = require('express')
const router = express.Router()

const {
    createAssignment,
    getAssignmentFromCourse
} = require('../controllers/assignmentController')

const { protect } = require('../middleware/authMiddleware')

router.post('/assignment', createAssignment)
router.get('/course/:courseId/assignment/:assignmentId', protect, getAssignmentFromCourse)
module.exports = router