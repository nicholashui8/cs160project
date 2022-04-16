const express = require('express')
const router = express.Router()

const {
    createCourse,
    getCoursesFromUser
} = require('../controllers/courseController')

const { protect } = require('../middleware/authMiddleware')

// router.post('/course/:id', createCourse)

router.post('/course', protect, createCourse)
router.get('/user/courses', protect, getCoursesFromUser)

module.exports = router