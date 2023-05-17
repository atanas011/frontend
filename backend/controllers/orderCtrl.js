import Order from '../models/order.js'
import Product from '../models/product.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncErrs from '../middleware/catchAsyncErrs.js'

export const newOrder = catchAsyncErrs(async (req, res, next) => {
    const {
        orderItems,
        itemsPrice,
        tax,
        shippingPrice,
        totalPrice,
        paymentInfo,
        shippingInfo
    } = req.body
    const order = await Order.create({
        orderItems,
        itemsPrice,
        tax,
        shippingPrice,
        totalPrice,
        paymentInfo,
        shippingInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        order
    })
})

export const getOrderById = catchAsyncErrs(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

export const getUserOrders = catchAsyncErrs(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        count: orders.length,
        orders
    })
})

export const getAllOrders = catchAsyncErrs(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

export const updateOrderStatus = catchAsyncErrs(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('Order already delivered', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}

export const deleteOrder = catchAsyncErrs(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('Order not found', 404))
    }

    await order.deleteOne()

    res.status(200).json({
        success: true
    })
})
