import './paginate.css'
import React from "react";
import ReactPaginate from "react-paginate";


function Paginate ({pageCount, onPageChange}){

    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                previousLabel="< previous"
                pageCount={pageCount}
                onPageChange={onPageChange}
                containerClassName="pagination-container"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
            />
        </div>
    )
}
export default Paginate;
