const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const router = express.Router()

const {
    createSubmission,
    createAssignmentSubmission
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
module.exports = router