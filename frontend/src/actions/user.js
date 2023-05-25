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
    UPDATE_PROFILE_REQ,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQ,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOTTEN_PASSWORD_REQ,
    FORGOTTEN_PASSWORD_SUCCESS,
    FORGOTTEN_PASSWORD_FAIL,
    NEW_PASSWORD_REQ,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQ,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQ,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQ,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    DELETE_USER_REQ,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
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

        const { data } = await axios.get('/profile')

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

export const updateProfile = userData => async dispatch => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQ })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put('/profile/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePassword = passwords => async dispatch => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgottenPassword = email => async dispatch => {
    try {

        dispatch({ type: FORGOTTEN_PASSWORD_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/password/reset', email, config)

        dispatch({
            type: FORGOTTEN_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: FORGOTTEN_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const resetPassword = (token, passwords) => async dispatch => {
    try {

        dispatch({ type: NEW_PASSWORD_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
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

export const allUsers = () => async dispatch => {
    try {

        dispatch({ type: ALL_USERS_REQ })

        const { data } = await axios.get('/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async dispatch => {
    try {

        dispatch({ type: UPDATE_USER_REQ })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/admin/user/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = id => async dispatch => {
    try {

        dispatch({ type: USER_DETAILS_REQ })

        const { data } = await axios.get(`/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = id => async dispatch => {
    try {

        dispatch({ type: DELETE_USER_REQ })

        const { data } = await axios.delete(`/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}
