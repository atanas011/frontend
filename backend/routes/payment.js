import express from 'express'
import { processPayment, sendStripeApiKey } from '../controllers/paymentCtrl.js'
import { isAuthenticatedUser } from '../middleware/auth.js'

export const payment = express.Router()

payment.post('/payment/process', isAuthenticatedUser, processPayment)
payment.get('/stripeapi', isAuthenticatedUser, sendStripeApiKey)
