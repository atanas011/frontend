import {
    PRODUCTS_REQ,
    PRODUCTS_SUCCESS,
    PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/product'

export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {

        case PRODUCTS_REQ:
            return {
                loading: true,
                products: []
            }

        case PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            }

        case PRODUCTS_FAIL:
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
