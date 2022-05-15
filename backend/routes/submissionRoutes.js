const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const {
    createSubmission,
    createAssignmentSubmission,
    updateAssingmentSubmission,
    getSubmissionsFromAssignment,
    gradeSubmission
} = require('../controllers/submissionController')

const { protect } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontend/public/submissions'))
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, `${Date.now()}-${fileName}`)
    }
})

const upload = multer({ storage: storage })

router.post('/submission-test', createSubmission)
router.post('/submission', protect, upload.single('submissionFile'), createAssignmentSubmission)
router.put('/submission/update', protect, upload.single('submissionFile'), updateAssingmentSubmission)
router.get('/course/:courseId/assignments/:assignmentId/submissions', protect, getSubmissionsFromAssignment)
router.put('/submission/grade', protect, gradeSubmission)
module.exports = router