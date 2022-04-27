const express = require('express')
const router = express.Router()

const {
    createSubmission
} = require('../controllers/submissionController')

router.post('/submission', createSubmission)
module.exports = router