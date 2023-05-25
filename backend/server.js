import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import { app } from './app.js'
import { connectDB } from './config/database.js'

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1)
})
// uncaught exception
// console.log(a)

dotenv.config({ path: 'backend/config/config.env' })

connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(process.env.PORT || 3000,
    console.log(`Server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
)

// e.g. handles wrong connection string
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down the server due to unhandled Promise rejection')
    server.close(() =>
        process.exit(1)
    )
})
