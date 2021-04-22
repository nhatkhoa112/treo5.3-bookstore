
import React from 'react';
import { Pagination } from 'react-bootstrap';


const PaginationBar = ({pageNumber, setPageNumber, total, fetchData}) => {
    const totalPage = Math.ceil(total/10);
    
    const fetchNewPage = (p) => {
        setPageNumber(p);
        console.log(p);
        fetchData(p);
    }

    
    return (
        <div>
            <Pagination>
                <Pagination.First onClick={() => fetchNewPage(1)} />
                <Pagination.Prev />
                {pageNumber > 1 && (<Pagination.Item onClick={() => fetchNewPage(pageNumber-1)} >
                    {pageNumber-1}
                </Pagination.Item>)
                }
                <Pagination.Item active onClick={() => fetchNewPage(pageNumber)} > {pageNumber}</Pagination.Item>
                { pageNumber !== totalPage && (<Pagination.Item onClick={() => fetchNewPage(pageNumber+1)} >
                                            {pageNumber +1}
                                            </Pagination.Item> )}
                { pageNumber !== totalPage && (<Pagination.Next onClick={() => fetchNewPage(pageNumber+1)}/>)}

                { pageNumber !== totalPage && (<Pagination.Last onClick={() => fetchNewPage(totalPage)}/>)}
            
            </Pagination>
        </div>
    )
}

export default PaginationBar
