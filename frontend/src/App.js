import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { loadUser } from './actions/user'

import store from './store'

import Home from './components/Home'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import ProductDetails from './components/product/ProductDetails'

import Login from './components/user/Login'
import Register from './components/user/Register'

import Protected from './components/route/Protected'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgottenPassword from './components/user/ForgottenPassword'
import ResetPassword from './components/user/ResetPassword'

import './App.css'

export default function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="search/:keyword" element={<Home />} />
            <Route path="product/:id" element={<ProductDetails />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<Protected />}>
              <Route path="profile" element={<Profile />} />
              <Route path="profile/update" element={<UpdateProfile />} />
              <Route path="password/update" element={<UpdatePassword />} />
            </Route>
            
            <Route path="password/reset" element={<ForgottenPassword />} />
            <Route path="password/reset/:token" element={<ResetPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}
