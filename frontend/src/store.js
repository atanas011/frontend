import { configureStore } from '@reduxjs/toolkit'

import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    productReducer,
    reviewsReducer,
    reviewReducer
} from './reducers/product'
import {
    authReducer,
    userReducer,
    forgottenPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from './reducers/user'
import { cartReducer } from './reducers/cart'
import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer
} from './reducers/order'

const store = configureStore({
    preloadedState: {
        cart: {
            cartItems: localStorage.getItem('cartItems') ?
                JSON.parse(localStorage.getItem('cartItems')) : [],
            shippingInfo: localStorage.getItem('shippingInfo') ?
                JSON.parse(localStorage.getItem('shippingInfo')) : {}
        }
    },
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        auth: authReducer,
        user: userReducer,
        forgottenPassword: forgottenPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        newReview: newReviewReducer,
        newProduct: newProductReducer,
        product: productReducer,
        allOrders: allOrdersReducer,
        order: orderReducer,
        allUsers: allUsersReducer,
        userDetails: userDetailsReducer,
        reviews: reviewsReducer,
        review: reviewReducer
    }
})

export default store
