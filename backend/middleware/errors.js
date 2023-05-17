import { ErrorHandler } from '../utils/errorHandler.js'

export default function (err, req, res, next) {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({ // create custom json res
            success: false,
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {

        // e.g. handles sent req with wrong object id
        if (err.name === 'CastError') { // get error name and path from Postman res body in dev mode
            const msg = `Resource not found. Invalid ${err.path}`
            err = new ErrorHandler(msg, 400)
        }

        // e.g. handles sent create req w/o required params in body json
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors).map(value => value.message)
            err = new ErrorHandler(msg, 400)
        }

        if (err.name === 'JsonWebTokenError') {
            const msg = 'JSON Web Token is invalid. Try Again.'
            err = new ErrorHandler(msg, 400)
        }

        if (err.name === 'TokenExpiredError') {
            const msg = 'JSON Web Token has expired. Try Again.'
            err = new ErrorHandler(msg, 400)
        }

        // handles duplicate key error (e.g. registration with same email)
        if (err.code === 11000) {
            const msg = `Duplicate ${Object.keys(err.keyValue)} entered`
            err = new ErrorHandler(msg, 400)
        }

        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
}
