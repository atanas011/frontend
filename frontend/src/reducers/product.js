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
    NEW_REVIEW_RESET,
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
                productCount: action.payload.productCount,
                resPerPage: action.payload.resPerPage,
                filteredProductCount: action.payload.filteredProductCount
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

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {

        case PRODUCT_DETAILS_REQ:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }

        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {

        case NEW_REVIEW_REQ:
            return {
                ...state,
                loading: true
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }

        case NEW_REVIEW_FAIL:
            return {
                ...state,
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
