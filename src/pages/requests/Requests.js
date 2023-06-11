import ModalRequest from "./ModalRequest";
import Card from "./card/Card";
import {HttpRequest} from "../../services/HttpRequest";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";


function Requests() {

    const [data, setData] = useState()

    const [pagination, setPagination] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;
    const TOTAL = pagination ? pagination.totalPages : 0;

    const handleRequests = async () => {
        try {
            const requests = await HttpRequest.get(`/requests?page=${currentPage}&size=${itemsPerPage}`)
            const page = requests.data;
            console.log("data", requests)

            setData(requests.data.content)
            setPagination(page);
        } catch (error) {
            console.log("erroi", error)
        }
    }

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data && data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data && data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


    useEffect(() => {
        handleRequests()
    }, [])

    return (
        <div>
            <div>
                <h1 className="title">Solicitações</h1>
            </div>
            <ModalRequest getRequests={handleRequests} title="Nova solicitação"/>
            <Card
                getRequests={handleRequests}
                data={data}/>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </div>
    )
}

export default Requests;
