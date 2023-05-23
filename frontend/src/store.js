import { configureStore } from '@reduxjs/toolkit'

import { productsReducer, productDetailsReducer } from './reducers/product'
import { authReducer, userReducer, forgottenPasswordReducer } from './reducers/user'

const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        auth: authReducer,
        user: userReducer,
        forgottenPassword: forgottenPasswordReducer
    }
})

export default store
