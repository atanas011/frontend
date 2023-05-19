import axios from 'axios'

import {
    PRODUCTS_REQ,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQ,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
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

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
