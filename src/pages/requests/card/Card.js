import './card.css'
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {HttpRequest, role} from "../../../services/HttpRequest";
import Moment from 'react-moment';
import InputFilter from "../../../components/filter/InputFilter";

function Card({data, getRequests}) {

    const [filter, setFilter] = useState('')
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
        switch (x.status) {
            case 'ACCEPTED':
                return (accepted(x))
            case 'CANCELED':
                return (canceled(x))
            case 'RETURNED':
                return (returned(x))
            case 'PENDING':
                return (pending(x))
        }
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    const filteredData = data && data.filter((x) => {
        const status = x.status.toLowerCase()
        const statusFiltered = filter && filter.toLowerCase();
        return status.startsWith(statusFiltered)
    })

    return (
        <div>
            <InputFilter
                title="Filtrar por status"
                className="filter-input"
                type="text"
                value={filter}
                onChange={handleFilter}
            />
            <div className="card-container">

                {filteredData && filteredData.map((x) => (
                    <div className="card">
                        <div className="card_body">
                            <h4>{x.product.productName}</h4>
                            <h4>{x.quantity}</h4>
                            <h3>{x.reason}</h3>
                        </div>
                        <div className="card_footer">
                            <div className="user_info">
                                <h5>{x.user.name}</h5>
                                {role === 'ROLE_ADMIN' &&
                                    <div>
                                        {
                                            renderStatus(x)
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Card
