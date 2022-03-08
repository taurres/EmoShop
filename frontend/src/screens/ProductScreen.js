import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const product_id = useParams().id

    // fetch product details
    useEffect(() => {
        dispatch(listProductDetails(product_id))

    }, [dispatch])
    // reduce product details

    const productDetails = useSelector(state => state.productDetails)
    const {loading, product, error} = productDetails

    // add product to cart with product id and quantity
    const addToCartHandler = () => {
        navigate(`/cart/${product_id}?qty=${qty}`)
    }

    // const product = products.find(p => p._id === cur_id);
    return (
        <>
            <Link className="btn btn-primary my-3" to="/">Back</Link>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroupItem variant="flush">
                                    <Row>
                                        <Col>Price</Col>
                                        <Col>{product.price}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem variant="flush">
                                    <Row>
                                        <Col>Status</Col>
                                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                    </Row>
                                </ListGroupItem>

                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={event => setQty(event.target.value)}
                                                >
                                                    {
                                                        [...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem>
                                    <div className="d-grid gap-2">
                                        <Button
                                            className="btn-primary"
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >Add to Cart</Button>
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }
        </>
    )
}

export default ProductScreen