import { configureStore } from '@reduxjs/toolkit'

import { productsReducer, productDetailsReducer } from './reducers/product'
import { authReducer, userReducer, forgottenPasswordReducer } from './reducers/user'
import { cartReducer } from './reducers/cart'

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
        cart: cartReducer
    }
})

export default store
