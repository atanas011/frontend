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

import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'

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
            <Route path="password/reset" element={<ForgottenPassword />} />
            <Route path="password/reset/:token" element={<ResetPassword />} />

            <Route element={<Protected />}>
              <Route path="profile" element={<Profile />} />
              <Route path="profile/update" element={<UpdateProfile />} />
              <Route path="password/update" element={<UpdatePassword />} />

              <Route path="shipping" element={<Shipping />} />
              <Route path="order/confirm" element={<ConfirmOrder />} />
            </Route>

            <Route path="cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}
