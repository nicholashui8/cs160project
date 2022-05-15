const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const {
    addCoursesToUser,
    createCourse,
    deleteCourse,
    dropCoursesFromUser,
    getCourseFromUser,
    getCoursesFromUser,
    getCoursesNotEnrolledIn
} = require('../controllers/courseController')

const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontend/public/syllabi'))
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${Date.now()}-${fileName}`)
    }
})

const upload = multer({ storage: storage })

router.post('/course', protect, upload.single('syllabus'), createCourse)
router.get('/user/course/:id', protect, getCourseFromUser)
router.get('/user/courses', protect, getCoursesFromUser)
router.put('/user/courses-enroll', protect, addCoursesToUser)
router.put('/user/courses-drop', protect, dropCoursesFromUser)
router.get('/user/courses-not-enrolled', protect, getCoursesNotEnrolledIn)
router.delete('/user/courses-delete/:courseId', protect, deleteCourse)

module.exports = router