import express from 'express'
import {
    getProducts,
    newProduct,
    getProductById,
    getAdminProducts,
    updateProduct,
    deleteProduct,
    createReview,
    getReviews,
    deleteReview
} from '../controllers/productCtrl.js'
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js'

export const product = express.Router()

product.get('/products', getProducts)
product.get('/product/:id', getProductById)
product.get('/admin/products', getAdminProducts)
product.post('/admin/product/new', isAuthenticatedUser, authorizeRoles('Admin'), newProduct)
product.put('/admin/product/:id', isAuthenticatedUser, authorizeRoles('Admin'), updateProduct)
product.delete('/admin/product/:id', isAuthenticatedUser, authorizeRoles('Admin'), deleteProduct)

product.put('/review', isAuthenticatedUser, createReview)
product.get('/reviews', isAuthenticatedUser, getReviews)
product.delete('/reviews', isAuthenticatedUser, deleteReview)
