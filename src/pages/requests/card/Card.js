import './card.css'
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {HttpRequest} from "../../../services/HttpRequest";
import Moment from 'react-moment';

function Card({data, getRequests}) {

    const requestStatus = async (requestId, status) => {

        const request = {requestId, status}
        try {
            await HttpRequest.post("/request-status", request)
            getRequests()
        } catch (error) {
            console.log("error", error)
        }
    }

    const canceled = () => {
        return (
            <Button className="btn-canceled">Cancelado</Button>
        )
    }

    const returned = () => {
        return (
            <Button className="btn-closed">Devolvido</Button>
        )
    }
    const accepted = (x) => {
        return (
            <div>
                <small>
                    <Moment format="YYYY/MM/DD, h:mm:ss">
                        {x.acceptedAt}
                    </Moment>
                </small>
                <Button
                    className="btn-return"
                    onClick={() => requestStatus(x.request_id, "RETURNED")}>
                    Devolver
                </Button>
            </div>
        )
    }

    const pending = (x) => {
        return (
            <div>
                <small>
                    <Moment format="YYYY/MM/DD, h:mm:ss">
                        {x.createdAt}
                    </Moment>
                </small>
                <Button
                    className="btn-accept"
                    onClick={() => requestStatus(x.request_id, "ACCEPTED")}>
                    Aceitar
                </Button>
                <Button
                    className="btn-cancel"
                    onClick={() => requestStatus(x.request_id, "CANCELED")}>
                    cancelar
                </Button>
            </div>
        )
    }

    useEffect(() => {
        getRequests()
        console.log("data", data)

    }, [])

    const renderStatus = (x) => {
        switch(x.status){
            case 'ACCEPTED':
                return(accepted(x))
            case 'CANCELED':
                return(canceled(x))
            case 'RETURNED':
                return(returned(x))
            case 'PENDING':
                return(pending(x))
        }
    }

    return (
        <div className="card-container">
            {data && data.map((x) => (
                <div className="card">
                    <div className="card_body">
                        <h4>{x.product.productName}</h4>
                        <h4>{x.quantity}</h4>
                        <h3>{x.reason}</h3>
                    </div>
                    <div className="card_footer">
                        <div className="user_info">
                            <h5>{x.user.name}</h5>
                            <div>
                                {
                                    renderStatus(x)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default Card
