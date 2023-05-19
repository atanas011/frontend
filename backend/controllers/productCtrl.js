import Product from '../models/product.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncErrs from '../middleware/catchAsyncErrs.js'
import { APIFeatures } from '../utils/apiFeatures.js'

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

export const newProduct = catchAsyncErrs(async (req, res, next) => {
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
    let product = await Product.findById(req.params.id) // const cannot be reassigned

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
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
