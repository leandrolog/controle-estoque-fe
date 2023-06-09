import React from "react";
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalBody} from "react-bootstrap";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";
import {HttpRequest, role} from "../../services/HttpRequest";

function ModalProductsUpdate({title, data, dataId, modalTitle , update}) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const productId = dataId

    const [productName, setProductName] = useState(data.productName)
    const [quantity, setQuantity] = useState(data.quantity)
    const [supplier, setSupplier] = useState(data.supplier)
    const [unitPrice, setUnitPrice] = useState(data.unitPrice)

    const updateProduct = async () => {
        const product = {productName, quantity, unitPrice, supplier}
        try {
            await HttpRequest.put(`/product/${productId}`, product)
            NotifySuccess()
            update()
            handleClose()
        } catch (error) {
            console.log(error)
            NotifyError()
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                {title}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form>
                        <InputWithLabel
                            title="Produto:"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Fornecedor:"
                            type="text"
                            value={supplier}
                            onChange={(e) => setSupplier(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Quantidade:"
                            type="text"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Preço:"
                            type="text"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(e.target.value)}
                            className="input"
                        />
                    </form>
                    <Modal.Footer clasName="footer">
                        <Button className="button-close" onClick={handleClose}>
                            close
                        </Button>
                        <Button className="button-save" onClick={updateProduct}>
                            Save
                        </Button>
                    </Modal.Footer>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default ModalProductsUpdate;
