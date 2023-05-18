import React from 'react'
import { Link } from 'react-router-dom'


const Product = ({ product }) => {

    const details = `product/${product._id}`

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <Link to={details}>
                    <img src={product.images[0].url} className="card-img-top mx-auto" alt={product.name} />
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={details}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">{product.price}€</p>
                    <Link to={details} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
