import { ADD_ITEM, REMOVE_ITEM, SAVE_SHIPPING_INFO } from '../constants/cart'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case ADD_ITEM:
            const item = action.payload
            const itemExists = state.cartItems.find(i => i.product === item.product)

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === itemExists.product ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state
    }
}
