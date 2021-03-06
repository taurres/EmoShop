import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    register new suer
// @route   POST /api/users
// @access  public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    const existUser = await User.findOne({email})

    // check if user exists
    if (existUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    // if not exist, create a new user
    const user = await User.create({
        name,
        email,
        password
    })

    // send the new user data
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Auth user and get token
// @route   POST /api/users/login
// @access  Public
export const authUser = expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body
    // find user by email
    const user = await User.findOne({email})

    // if user exists and password matches, return user data with token
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Get user profile
// @route   GET /api/users/login
// @access  Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
    // req.user is defined in authMiddleware
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    // get user by id
    const user = await User.findById(req.user._id)
    // update the updated attributes
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        // save the updated user
        const updatedUser = await user.save()
        // return the updated user
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/admin
export const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/admin
export const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/admin
export const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/admin
export const updateUser = expressAsyncHandler(async (req, res) => {
    // get user by params id
    const user = await User.findById(req.params.id)
    // update the updated attributes
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        // save the updated user
        const updatedUser = await user.save()
        // return the updated user
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('User not found')
    }
})