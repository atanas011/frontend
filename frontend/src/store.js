import { configureStore } from '@reduxjs/toolkit'

import { productsReducer, productDetailsReducer } from './reducers/product'

const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer
    }
})

export default store
