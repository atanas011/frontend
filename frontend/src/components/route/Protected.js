import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const { isAuthenticated, isAdmin, user } = useSelector(state => state.auth)

    if (!isAuthenticated) {
        return <Navigate to='login' />
    }

    if (isAdmin && user.role !== 'Admin') {
        return <Navigate to='/' />
    }

    return (
        <Outlet />
    )
}

export default Protected
