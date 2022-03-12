import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products?keyword=''
// @access  Public
export const getProducts = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await Product.find({...keyword})
    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    create new review
// @route   POST /api/products/:id/reviews
// @access  private
export const createProductReview = expressAsyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    // fetch existed product
    const product = await Product.findById(req.params.id)

    if (product) {
        // check if product is reviewed by given user, user can only review once
        const alreadyReviewed = product.reviews
            .find(review => review.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        // create review object
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        // append new review to the reviews list of the product
        product.reviews.push(review)

        // recalculate the numReviews and average rating after adding this new review
        product.numReviews = product.reviews.length
        product.rating = product.reviews
            .reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

