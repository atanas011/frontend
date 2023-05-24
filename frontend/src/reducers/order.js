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

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {

        case CREATE_ORDER_REQ:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case MY_ORDERS_REQ:
            return {
                loading: true
            }

        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }

        case MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {

        case ORDER_DETAILS_REQ:
            return {
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
