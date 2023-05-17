import dotenv from 'dotenv'
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

const server = app.listen(process.env.PORT,
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
