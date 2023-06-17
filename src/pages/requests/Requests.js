import ModalRequest from "./ModalRequest";
import Card from "./card/Card";
import {HttpRequest} from "../../services/HttpRequest";
import React, {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import Paginate from "../../components/reactPaginate/Paginate";


function Requests() {

    const [data, setData] = useState()

    const [pagination, setPagination] = useState();

    const [totalPage, setTotalPage] = useState(0);
    const itemsPerPage = 10;
    const TOTAL = pagination ? pagination.totalPages : 0;

    const handleRequests = async (offset) => {
        try {
            const requests = await HttpRequest.get(`/requests?page=${offset}&size=${itemsPerPage}`)
            setTotalPage(requests.data.totalPages);
            console.log("data", requests)

            setData(requests.data.content)
        } catch (error) {
            console.log("erroi", error)
        }
    }

    const handlePageClick = ({selected}) => {
        handleRequests(selected);
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
            <Paginate
                pageCount={totalPage}
                onPageChange={handlePageClick}
            />
        </div>
    )
}

export default Requests;
