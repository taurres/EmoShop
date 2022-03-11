import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { deleteUser, listUsers } from '../actions/userActions'

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state => state.userList)
    const {loading, users, error} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }
    }, [dispatch, success, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> : error ? <Message variant="danger"></Message>
                : (
                    <Table striped hover responsive className="table-sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin
                                        ? <i className="fa-solid fa-check" style={{color: 'green'}}></i>
                                        : <i className="fa-solid fa-xmark" style={{color: 'red'}}></i>
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="primary" className="btn mx-1">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btm-sm mx-1"
                                            onClick={() => deleteHandler(user._id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default UserListScreen