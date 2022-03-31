const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @description     Register new user
// @route           POST /api/users
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, studentId, email, password } = req.body

    if(!name || !studentId || !email || !password) {
        res.status(400)
        throw new Error("Please add all fields") 
    }

    // check if user exists, by checking if email is already used
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create the user
    const user = await User.create({
        name,
        studentId,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @description    Login a user
// @route          POST /api/users/login
// @access         Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @description    Get User data
// @route          GET /api/users/me
// @access         Private
const getMe = asyncHandler(async (req, res) => {
    res.json({message: 'user data fetched'})
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
}