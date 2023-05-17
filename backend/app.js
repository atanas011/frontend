import express from 'express'
import { auth } from './routes/auth.js'
import { order } from './routes/order.js'
import { product } from './routes/product.js'
import errorMiddleware from './middleware/errors.js'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/', auth)
app.use('/', order)
app.use('/', product)

app.use(errorMiddleware) // this has to be last
