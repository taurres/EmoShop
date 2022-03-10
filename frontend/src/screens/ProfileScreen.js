import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // get profile details
    const userDetails = useSelector(state => state.userDetails)
    const {loading, user, error} = userDetails

    // get the user login data from redux store
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // get update profile result
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        // if no login user, redirect to login page
        if (!userInfo) {
            navigate('/login')
        } else {
            // if no user detail, get user details first
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                // if have use detail, update the state
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user])


    const submitHandler = (event) => {
        // prevent page refresh
        event.preventDefault()
        // dispatch register if two input passwords match
        if (password !== confirmPassword) {
            setMessage('Password do  not match')
        } else {
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>my orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen