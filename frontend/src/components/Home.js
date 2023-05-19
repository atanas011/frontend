import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import Loader from './layout/Loader'
import MetaData from './layout/MetaData'

import Product from './product/Product'

import { getProducts } from '../actions/product'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 20])
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState(0)

  const { keyword } = useParams()
  const { loading, products, error, productCount, resPerPage, filteredProductCount } =
    useSelector(state => state.products)

  const categories = [
    'Apple',
    'Apricot',
    'Pear',
    'Plum',
    'Walnut'
  ]

  useEffect(() => {

    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(currentPage, keyword, price, category, rating))

  }, [dispatch, alert, error, currentPage, keyword, price, category, rating])

  function setCurrentPageNum(pageNum) {
    setCurrentPage(pageNum)
  }

  let count = keyword ? filteredProductCount : productCount

  return (
    <Fragment>
      {loading ? <Loader /> :
        <Fragment>
          <MetaData title={'Buy Best Products Online'} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">

              {keyword ?
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      {/* =========================== FILTER BY PRICE RANGE */}
                      <Range
                        marks={{ 1: '1€', 20: '20€' }}
                        min={1}
                        max={20}
                        defaultValue={[1, 20]}
                        tipFormatter={value => `${value}€`}
                        tipProps={{ placement: 'top', visible: true }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />
                      {/* ============================== FILTER BY CATEGORY */}
                      <hr className="my-5" />
                      <div className="mt-5" >
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map(category =>
                            <li
                              style={{ cursor: 'pointer', listStyle: 'none' }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          )}
                        </ul>
                      </div>
                      {/* =============================== FILTER BY RATINGS */}
                      <hr className="my-3" />
                      <div className="mt-5" >
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map(star =>
                            <li
                              style={{ cursor: 'pointer', listStyle: 'none' }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{ width: `${star * 20}%` }}>
                                </div>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* ===================================== RENDER PRODUCTS */}
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map(product =>
                        <Product key={product._id} product={product} col={4} />
                      )}
                    </div>
                  </div>
                </Fragment> :
                products.map(product =>
                  <Product key={product._id} product={product} col={3} />
                )
              }
            </div>
          </section>
          {/* ================================================== PAGINATION */}
          {resPerPage < count &&
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNum}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          }
        </Fragment>
      }
    </Fragment>
  )
}

export default Home
