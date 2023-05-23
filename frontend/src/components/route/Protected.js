import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const { isAuthenticated } = useSelector(state => state.auth)

    return (
        isAuthenticated ? <Outlet /> : <Navigate to='login' />
    )
}

export default Protected
