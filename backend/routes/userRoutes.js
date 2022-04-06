const express = require('express')
const router = express.Router()

const {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    getAllUsers
} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware')

router.post('/user', registerUser)
router.post('/user/login', loginUser)
router.get('/user/profile', protect, getMe)

router.route('/user/:id').delete(deleteUser).put(updateUser)
router.get('/users', getAllUsers)

module.exports = router