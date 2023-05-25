import axios from 'axios'

import {
    PRODUCTS_REQ,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQ,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQ,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ADMIN_PRODUCTS_REQ,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQ,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQ,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQ,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    GET_REVIEWS_REQ,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQ,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/product'

export const getProducts =
    (currentPage = 1, keyword = '', price, category, rating = 0) => async dispatch => {
        try {

            dispatch({ type: PRODUCTS_REQ })

            let queryStr = `
                /products?keyword=${keyword
                }&page=${currentPage
                }&price[gt]=${price[0]}&price[lt]=${price[1]
                }&ratings[gte]=${rating}
            ` // gte (greather than or equals, >=), gt (greather than, >)

            if (category) {
                queryStr = `
                    /products?keyword=${keyword
                    }&page=${currentPage
                    }&price[gt]=${price[0]}&price[lt]=${price[1]
                    }&category=${category
                    }&ratings[gte]=${rating}
                `
            }

            const { data } = await axios.get(queryStr)

            dispatch({
                type: PRODUCTS_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: PRODUCTS_FAIL,
                payload: error.response.data.message
            })
        }
    }

export const getProductDetails = id => async dispatch => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQ })

        const { data } = await axios.get(`/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = reviewData => async dispatch => {
    try {

        dispatch({ type: NEW_REVIEW_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProducts = () => async dispatch => {
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQ })

        const { data } = await axios.get('/admin/products')

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {

        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

export const newProduct = productData => async dispatch => {
    try {

        dispatch({ type: NEW_PRODUCT_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/admin/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
        // console.log(data)

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteProduct = id => async dispatch => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQ })

        const { data } = await axios.delete(`/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
        // console.log(data)

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async dispatch => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
        // console.log(data)

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getReviews = id => async dispatch => {
    try {

        dispatch({ type: GET_REVIEWS_REQ })

        const { data } = await axios.get(`/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })

    }
}

export const deleteReview = (id, productId) => async dispatch => {
    try {

        dispatch({ type: DELETE_REVIEW_REQ })

        const { data } = await axios.delete(`/reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })

    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
