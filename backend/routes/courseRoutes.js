const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const router = express.Router()

const {
    createCourse,
    getCourseFromUser,
    getCoursesFromUser
} = require('../controllers/courseController')

const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/'))
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

module.exports = router