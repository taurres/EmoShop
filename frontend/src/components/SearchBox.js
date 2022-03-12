import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')

    const submitHandler = (event) => {
        event.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type="text"
                name="query"
                onChange={event => setKeyword(event.target.value)}
                placeholder="Search"
                className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button type="submit" variant="light" className="btn-sm p-2 mx-2">
                Search
            </Button>
        </Form>
    )
}

export default SearchBox