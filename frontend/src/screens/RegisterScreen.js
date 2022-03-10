import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const [searchParams] = useSearchParams()
    // get the redirect path if exists else go to home page
    const redirect = searchParams.get('redirect') || '/'

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // get the user login data from redux store
    const userRegister = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])


    const submitHandler = (event) => {
        // prevent page refresh
        event.preventDefault()
        // dispatch register if two input passwords match
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="py-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="py-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="py-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="py-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" value="primary">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen