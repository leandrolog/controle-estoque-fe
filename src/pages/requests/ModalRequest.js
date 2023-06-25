import React, {useEffect} from "react";
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalBody} from "react-bootstrap";
import {HttpRequest, user_id} from "../../services/HttpRequest";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";

function ModalRequest({title, getRequests}) {

    const [show, setShow] = useState(false)
    const [openDropDown, setOpenDropDown] = useState(false)

    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
    const handleDropDown = () => {
        setOpenDropDown(!openDropDown)
    };


    const [userId, setUserId] = useState(user_id)
    const [productId, setProductId] = useState()
    const [quantity, setQuantity] = useState()
    const [reason, setReason] = useState()

    const [products, setProducts] = useState()
    const createRequest = async (e) => {
        e.preventDefault()
        const request = {userId, productId, quantity, reason}
        try {
            await HttpRequest.post("/new-request", request)
            NotifySuccess()
            handleClose()
            console.log("request", request)

        } catch (error) {
            console.log("deu erro", error)
            console.log("request", request)
            NotifyError()
        }
    }

    const handleProducts = async () => {
        try {
            const response = await HttpRequest.get("/products")
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao obter os dados da tabela:", error);
        }
    }
    useEffect(() => {
        handleProducts()
    }, [])


    return (
        <div>
            <Button variant="primary" onClick={handleOpen}>{title}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Nova solicitação</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form>
                        <InputWithLabel
                            title="Usuário:"
                            type="text"
                            value={user_id}
                            className="input"
                            disabled="disabled"
                        />
                        <InputWithLabel
                            title="Quantidade:"
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="input"
                        />

                        <InputWithLabel
                            title="Motivo:"
                            type="text"
                            onChange={(e) => setReason(e.target.value)}
                            className="input"
                        />
                        <div>
                            <button onClick={handleDropDown}>Items</button>
                            {products && (
                                <select onChange={(e) => setProductId(e.target.value)}>
                                    <p>Selecione um produto</p>
                                    {products.map((x) => (
                                        <option key={x.productId} value={x.productId}>
                                            {x.productName}
                                        </option>
                                    ))}
                                </select>
                            )
                            }
                        </div>
                    </form>
                    <Modal.Footer clasName="footer">
                        <Button className="button-close" onClick={handleClose}>
                            close
                        </Button>
                        <Button className="button-save" onClick={createRequest}>
                            Save
                        </Button>
                    </Modal.Footer>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalRequest;
