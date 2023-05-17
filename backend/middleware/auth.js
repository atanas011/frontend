import catchAsyncErrs from './catchAsyncErrs.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const isAuthenticatedUser = catchAsyncErrs(async (req, res, next) => {
    const { token } = req.cookies // get token from cookie
    // console.log(token)
    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id) // id is stored in token
    next()
})

export const authorizeRoles = (role) => {
    return (req, res, next) => {
        if (role !== req.user.role) {
            return next(new ErrorHandler(
                `${req.user.role} is not authorized to access this resource`, 403))
        }
        next()
    }
}
