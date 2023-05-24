import axios from 'axios'

import { ADD_ITEM, REMOVE_ITEM, SAVE_SHIPPING_INFO } from '../constants/cart'

export const addItem = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/product/${id}`)

    dispatch({
        type: ADD_ITEM,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItem = id => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = data => async dispatch => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}
