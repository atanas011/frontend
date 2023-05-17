import express from 'express'
import {
    newOrder,
    getOrderById,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderCtrl.js'
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js'

export const order = express.Router()

order.post('/order/new', isAuthenticatedUser, newOrder)
order.get('/order/:id', isAuthenticatedUser, getOrderById)
order.get('/orders/user', isAuthenticatedUser, getUserOrders)

order.get('/admin/orders', isAuthenticatedUser, authorizeRoles('Admin'), getAllOrders)
order.put('/admin/order/:id', isAuthenticatedUser, authorizeRoles('Admin'), updateOrderStatus)
order.delete('/admin/order/:id', isAuthenticatedUser, authorizeRoles('Admin'), deleteOrder)
