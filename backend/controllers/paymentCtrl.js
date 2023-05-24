import catchAsyncErrs from '../middleware/catchAsyncErrs.js'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config({ path: 'backend/config/config.env' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const processPayment = catchAsyncErrs(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'eur',
        metadata: { integration_check: 'accept_payment' }
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

export const sendStripeApiKey = catchAsyncErrs(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})
