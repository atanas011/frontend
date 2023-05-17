import axios from 'axios'

import {
    PRODUCTS_REQ,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/product'

export const getProducts = () => async dispatch => {
    try {
        
        dispatch({ type: PRODUCTS_REQ })

        const { data } = await axios.get('/products')

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

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
