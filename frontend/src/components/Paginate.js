import React from 'react'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

/**
 * Pagination component
 * @param page current page number
 * @param pages total number of pages
 * @param isAdmin is user admin
 * @param keyword search keyword
 */
const Paginate = ({page, pages, isAdmin = false, keyword = ''}) => {
    // only show paginate if more than 1 page
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer
                    key={x + 1}
                    to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate