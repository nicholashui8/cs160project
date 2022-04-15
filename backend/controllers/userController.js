const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d'
    })
}

// @description     Register new user, 
// @route           POST /user-api/user
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, userType, schoolId, email, password } = req.body

    if(!name || !userType || !schoolId || !email || !password) {
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
        userType,
        schoolId,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @description    Login a user
// @route          POST /user-api/user/login
// @access         Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @description    Get User data
// @route          GET /user-api/user/profile
// @access         Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// @description    Update a User
// @route          PUT /user-api/user/:name?:id
// @access         Public
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedUser)
})

// @description    Deletes a User
// @route          DELETE /user-api/user/:name?:id
// @access         Public
const deleteUser = asyncHandler(async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }

        if (!user) {
            return res.status(400).json({success: false, error: 'User not found'})
        }

        return res.status(200).json({success: true, data: user})
    }).catch(err => console.log(err))
})

// @description    Get all Users
// @route          GET /user-api/users
// @access         Public
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.status(200).json(users)
})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    getAllUsers
}