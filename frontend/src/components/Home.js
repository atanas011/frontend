import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './layout/Loader'
import MetaData from './layout/MetaData'

import Product from './product/Product'

import { getProducts } from '../actions/product'

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch()

  const { loading, products, error } = useSelector(state => state.products)

  useEffect(() => {

    if (error) {
      // alert.success('Success')
      return alert.error(error)
    }

    dispatch(getProducts())

  }, [dispatch, alert, error])

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product =>
                <Product key={product._id} product={product} />
              )}
            </div>
          </section>
        </Fragment>
      }
    </Fragment>
  )
}

export default Home
