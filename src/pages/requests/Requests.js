import ModalRequest from "./ModalRequest";
import Card from "./card/Card";
import {HttpRequest} from "../../services/HttpRequest";
import React, {useEffect, useState} from "react";



function Requests() {

    const [data, setData] = useState()

    const [pagination, setPagination] = useState();

    const [totalPage, setTotalPage] = useState(0);
    const itemsPerPage = 10;
    const TOTAL = pagination ? pagination.totalPages : 0;

    const handleRequests = async (offset) => {
        try {
            const requests = await HttpRequest.get(`/requests`)
            setTotalPage(requests.data.totalPages);
            setData(requests.data)
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
            <div className="button-container">
                <ModalRequest getRequests={handleRequests} title="Nova solicitação"/>
            </div>

            <Card
                getRequests={handleRequests}
                data={data}/>
        </div>
    )
}

export default Requests;
