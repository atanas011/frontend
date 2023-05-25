import express from 'express'
import { auth } from './routes/auth.js'
import { order } from './routes/order.js'
import { product } from './routes/product.js'
import { payment } from './routes/payment.js'
import errorMiddleware from './middleware/errors.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const app = express()

dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())

app.use('/', auth)
app.use('/', order)
app.use('/', product)
app.use('/', payment)

const __dirname = dirname(fileURLToPath(import.meta.url))

//if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
//}

app.use(errorMiddleware) // this has to be last
