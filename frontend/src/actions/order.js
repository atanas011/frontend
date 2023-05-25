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
    ALL_ORDERS_REQ,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQ,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQ,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
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
export const getAllOrders = () => async dispatch => {
    try {

        dispatch({ type: ALL_ORDERS_REQ })

        const { data } = await axios.get('/admin/orders')

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateOrder = (id, orderData) => async dispatch => {
    try {

        dispatch({ type: UPDATE_ORDER_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/admin/order/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })
        // console.log('Order: ' + data)

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteOrder = id => async dispatch => {
    try {

        dispatch({ type: DELETE_ORDER_REQ })

        const { data } = await axios.delete(`/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
