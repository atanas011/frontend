import axios from 'axios'

import {
    LOGIN_REQ,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQ,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQ,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/user'

export const login = (email, password) => async dispatch => {
    try {

        dispatch({ type: LOGIN_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/login', { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = userData => async dispatch => {
    try {

        dispatch({ type: REGISTER_REQ })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/register', userData, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async dispatch => {
    try {

        dispatch({ type: LOAD_USER_REQ })

        const { data } = await axios.get('/user')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.data // ??? (data.user) !!!
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async dispatch => {
    try {

        await axios.get('/logout')

        dispatch({
            type: LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
