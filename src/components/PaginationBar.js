
import React from 'react';
import { Pagination } from 'react-bootstrap';


const PaginationBar = ({}) => {
    return (
        <div>
            <Pagination>
                <Pagination.First  />
                <Pagination.Prev />
                {/* {pageNumber > 1 && (<Pagination.Item >

                </Pagination.Item>)
                } */}
                <Pagination.Item active >1</Pagination.Item>
                <Pagination.Item >2</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    )
}

export default PaginationBar
