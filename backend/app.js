import express from 'express'
import { auth } from './routes/auth.js'
import { order } from './routes/order.js'
import { product } from './routes/product.js'
import { payment } from './routes/payment.js'
import errorMiddleware from './middleware/errors.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

export const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(fileUpload())

app.use('/', auth)
app.use('/', order)
app.use('/', product)
app.use('/', payment)

app.use(errorMiddleware) // this has to be last
