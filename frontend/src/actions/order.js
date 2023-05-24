import axios from 'axios'

import {
    CREATE_ORDER_REQ,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQ,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQ,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/order'

export const createOrder = order => async dispatch => {
    try {

        dispatch({ type: CREATE_ORDER_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/order/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
        // console.log('Order: ' + data)

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myOrders = () => async dispatch => {
    try {

        dispatch({ type: MY_ORDERS_REQ })

        const { data } = await axios.get('/orders/user')

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
        // console.log('data.orders: ' + data.orders)

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getOrderDetails = id => async dispatch => {
    try {

        dispatch({ type: ORDER_DETAILS_REQ })

        const { data } = await axios.get(`/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
        // console.log('data.order: ' + data.order)

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
