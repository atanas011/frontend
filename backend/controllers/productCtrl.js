import cloudinary from 'cloudinary'

import Product from '../models/product.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import { APIFeatures } from '../utils/apiFeatures.js'
import catchAsyncErrs from '../middleware/catchAsyncErrs.js'

export const getProducts = catchAsyncErrs(async (req, res, next) => {

    const resPerPage = 4
    const productCount = await Product.countDocuments()
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query
    let filteredProductCount = products.length
    apiFeatures.paginate(resPerPage)
    products = await apiFeatures.query.clone()

    res.status(200).json({
        success: true,
        productCount,
        resPerPage,
        filteredProductCount,
        products
    })
})

export const getAdminProducts = catchAsyncErrs(async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
})

export const newProduct = catchAsyncErrs(async (req, res, next) => {

    let images = []

    if (typeof req.body.images === 'string') { // 1 image
        images.push(req.body.images)
    } else { // multiple images
        images = req.body.images
    }

    let imagesLinks = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'happyfruits/products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

export const getProductById = catchAsyncErrs(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) { // e.g. handles sent req with wrong last char in id string
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

export const updateProduct = catchAsyncErrs(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'happyfruits/products'
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

export const deleteProduct = catchAsyncErrs(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
})

export const createReview = catchAsyncErrs(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews
        .reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

export const getReviews = catchAsyncErrs(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

export const deleteReview = catchAsyncErrs(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews
        .filter(review => review._id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
