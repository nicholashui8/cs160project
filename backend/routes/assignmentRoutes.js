const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const {
    createAssignment,
    deleteAssignment,
    getAssignmentsFromCourse,
    getAssignmentFromCourse
} = require('../controllers/assignmentController')

const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontend/public/assignmentFiles'))
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${Date.now()}-${fileName}`)
    }
})

const upload = multer({ storage: storage })

router.post('/assignment', protect, upload.single('assignmentFile'), createAssignment)
router.get('/course/:courseId/assignments', protect, getAssignmentsFromCourse)
router.get('/course/:courseId/assignment/:assignmentId', protect, getAssignmentFromCourse)
router.delete('/course/:courseId/delete/assignment/:assignmentId', protect, deleteAssignment)
module.exports = router