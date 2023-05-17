import { configureStore } from '@reduxjs/toolkit'

import { productsReducer } from './reducers/product'

const store = configureStore({
    reducer: {
        products: productsReducer
    }
})

export default store
