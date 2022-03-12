import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const keyword = useParams().keyword
    const pageNumber = useParams().pageNumber || 1

    useEffect(() => {
        //use redux to get product list
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])


    // reduce the productList data from redux store
    const productList = useSelector(state => state.productList)
    const {loading, products, page, pages, error} = productList

    return (
        <>
            <Meta/>
            {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-primary">Back</Link>}
            <h1>Latest Products</h1>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>
    )
}

export default HomeScreen