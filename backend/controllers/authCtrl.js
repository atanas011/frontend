import User from '../models/user.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncErrs from '../middleware/catchAsyncErrs.js'
import { sendToken } from '../utils/jwtToken.js'
import { sendEmail } from '../utils/sendEmail.js'
import crypto from 'crypto'

export const register = catchAsyncErrs(async (req, res, next) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/',
            url: 'https://res.cloudinary.com/.jpg'
        }
    })

    sendToken(user, 200, res)
})

export const login = catchAsyncErrs(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter Email & Password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
})

export const getUserProfile = catchAsyncErrs(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        data: user
    })
})

export const updatePassword = catchAsyncErrs(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if (!isMatched) {
        return next(new ErrorHandler('Invalid old password'))
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

export const updateProfile = catchAsyncErrs(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // Update avatar: TODO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

export const logout = catchAsyncErrs(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

export const forgottenPasswordEmail = catchAsyncErrs(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler('User with this email not found', 404))
    }
    const resetToken = user.getResetPasswordToken()
    // Token is also saved in DB
    await user.save({ validateBeforeSave: false })

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`

    const message = `Your password reset token is:\n\n${resetUrl}\n\nIf you did not request this email, please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorHandler(err.message, 500))
    }
})

export const resetPassword = catchAsyncErrs(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpires: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Token is invalid or has expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    sendToken(user, 200, res)
})

// Admin routes

export const getAllUsers = catchAsyncErrs(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        users
    })
})

export const getUserDetails = catchAsyncErrs(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler('User not found'))
    }

    res.status(200).json({
        success: true,
        user
    })
})

export const updateUser = catchAsyncErrs(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

export const deleteUser = catchAsyncErrs(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler('User not found'))
    }

    // Remove avatar from cloudinary: TODO

    await user.deleteOne()

    res.status(200).json({
        success: true
    })
})
