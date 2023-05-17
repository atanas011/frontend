import React, { Fragment } from 'react'

import MetaData from './layout/MetaData'

const Home = () => {
  return (
    <Fragment>
      {/* Add Custom Title */}
      <MetaData title={'Buy Best Products Online'} />

      <section id="products" className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
              <img
                src="https://res.cloudinary.com/dpv5tcps3/image/upload/v1683131890/happyfruits/products/abate_fetel_fpqgzq.jpg"
                className="card-img-top mx-auto"
                alt="product"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <a href="/#">Abate Fetel</a>
                </h5>
                <div className="ratings mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(0 Reviews)</span>
                </div>
                <p className="card-text">2.56€</p>
                <a href="/#" id="view_btn" className="btn btn-block">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Home
