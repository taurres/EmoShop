import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, products, error} = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
        <Carousel pause="hover" className="bg-body">
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} rounded fluid/>
                        <Carousel.Caption className="carousel-caption">
                            <h2>{product.name}</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel