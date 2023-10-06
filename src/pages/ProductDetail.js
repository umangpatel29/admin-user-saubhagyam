import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState()

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((response) => setProduct(response));
    }, [id])
    
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {
                        product ? (
                            <div>
                                <div className="product-detail my-2">
                                    <img src={product.thumbnail} alt={product.title} className="product-image" />
                                    <div className="product-info">
                                        <h2>{product.title}</h2>
                                        <p>{product.description}</p>
                                        <div className="product-details">
                                            <p>Brand: {product.brand}</p>
                                            <p>Category: {product.category}</p>
                                            <p>Price: ${product.price}</p>
                                            <p>Discount: {product.discountPercentage}%</p>
                                            <p>Rating: {product.rating}</p>
                                            <p>Stock: {product.stock}</p>
                                        </div>
                                    </div>

                                </div>
                                <div className="my-2">
                                <Link to='/'><button className="btn btn-warning">Back to Login page</button> </Link>
                                </div>
                            </div>
                        ) : (
                            <div>
                                data is not here
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
};

export default ProductDetail;
