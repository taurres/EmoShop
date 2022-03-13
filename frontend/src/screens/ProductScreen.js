import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { createProductReview, listProductDetails } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const product_id = useParams().id

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetails = useSelector(state => state.productDetails)
    const {loading, product, error} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {success: successProductReview, error: errorProductReview} = productCreateReview


    // fetch product details
    useEffect(() => {
        if (successProductReview) {
            // reset the state
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(product_id))

    }, [dispatch, successProductReview, product_id])
    // reduce product details


    // add product to cart with product id and quantity
    const addToCartHandler = () => {
        navigate(`/cart/${product_id}?qty=${qty}`)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(createProductReview(product_id, {rating, comment}))
    }

    // const product = products.find(p => p._id === cur_id);
    return (
        <>
            <Link className="btn btn-primary my-3" to="/">Back</Link>
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (<>
                <Meta title={product.name}/>
                <Row className="justify-content-center">
                    <Col md={12}>
                        <Image src={product.image} alt={product.name} rounded fluid/>
                    </Col>

                </Row>
                <Row className="justify-content-center py-2">
                    <Col md={9}>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: EMO$ {product.price}
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
                                        <Col>EMO$ {product.price}</Col>
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
                <Row>
                    <Col md={12}>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && <Message>No Reviews</Message>}
                        <ListGroup variant="flush">
                            {product.reviews.map(review => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item>
                                <h2>Write your review!</h2>
                                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="rating" className="py-1">
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={event => setRating(event.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Excellent</option>
                                                <option value="5">5 - Amazing</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment" className="py-1">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                row="3"
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary" className="my-2">Submit</Button>
                                    </Form>
                                ) : <Message>Please <Link to="/login">sign in</Link></Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </>)}
        </>
    )
}

export default ProductScreen