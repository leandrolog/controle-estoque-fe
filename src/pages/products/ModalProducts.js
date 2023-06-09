import React, {useEffect} from "react";
import './modalProducts.css'
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalBody} from "react-bootstrap";
import {HttpRequest} from "../../services/HttpRequest";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";

function  ModalProducts({title, getProducts}) {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const [productName, setProductName] = useState()
    const [quantity, setQuantity] = useState()
    const [supplier, setSupplier] = useState()
    const [unitPrice, setUnitPrice] = useState()

    const createRequest = async (e) => {
        e.preventDefault()
        const request = {productName, quantity, unitPrice, supplier}
        try {
            await HttpRequest.post("/new-product", request)
            NotifySuccess()
            getProducts()
            handleClose()
        } catch (error) {
            console.log("deu erro", error)
            NotifyError()
        }
    }


    return (
        <div>
            <Button variant="primary" onClick={handleOpen}>{title}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Register new product</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form >
                        <InputWithLabel
                            title="Produto:"
                            type="text"
                            onChange={(e) => setProductName(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Fornecedor:"
                            type="text"
                            onChange={(e) => setSupplier(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Quantidade:"
                            type="text"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Preço:"
                            type="text"
                            onChange={(e) => setUnitPrice(e.target.value)}
                            className="input"
                        />
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

export default ModalProducts;
