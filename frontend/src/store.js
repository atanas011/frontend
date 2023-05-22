import { configureStore } from '@reduxjs/toolkit'

import { productsReducer, productDetailsReducer } from './reducers/product'
import { authReducer } from './reducers/user'

const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        auth: authReducer
    }
})

export default store
