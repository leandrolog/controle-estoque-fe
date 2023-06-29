import './paginate.css'
import React from "react";
import ReactPaginate from "react-paginate";


function Paginate ({pageCount, handlePageChange}){

    return (
        <div>
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Próximo'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}
export default Paginate;
