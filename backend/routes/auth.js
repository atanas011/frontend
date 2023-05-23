import express from 'express'
import {
    register,
    login,
    logout,
    forgottenPasswordEmail,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserDetails,
    updateUser,
    deleteUser
} from '../controllers/authCtrl.js'
import { authorizeRoles, isAuthenticatedUser } from '../middleware/auth.js'

export const auth = express.Router()

auth.post('/register', register)
auth.post('/login', login)
auth.get('/logout', logout)

auth.get('/profile', isAuthenticatedUser, getUserProfile)
auth.put('/profile/update', isAuthenticatedUser, updateProfile)
auth.put('/password/update', isAuthenticatedUser, updatePassword)

auth.post('/password/reset', forgottenPasswordEmail)
auth.put('/password/reset/:token', resetPassword)

auth.get('/admin/users', isAuthenticatedUser, authorizeRoles('Admin'), getAllUsers)
auth.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('Admin'), getUserDetails)
auth.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles('Admin'), updateUser)
auth.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles('Admin'), deleteUser)
