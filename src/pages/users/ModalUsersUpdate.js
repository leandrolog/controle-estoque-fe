import React from "react";
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalBody} from "react-bootstrap";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";
import {HttpRequest, role} from "../../services/HttpRequest";

function ModalUsersUpdate({title, data, dataId, modalTitle , update}) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const userId = dataId

    const [name, setName] = useState(data.name)
    const [email, setEmail] = useState(data.email)
    const [department, setDepartment] = useState(data.department)
    const [password, setPassword] = useState(data.password)
    const [role, setRole] = useState(data.role)


    const updateProduct = async () => {
        const user = {name, email, department, password, role}
        try {
            await HttpRequest.put(`/user/${userId}`, user)
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
                            title="Nome:"
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Email:"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Setor:"
                            value={department}
                            type="text"
                            onChange={(e) => setDepartment(e.target.value)}
                            className="input"
                        />
                        <div className="input-container">
                            <label className="label-title">Cargo:</label>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="ROLE_ADMIN"
                                        checked={role === "ROLE_ADMIN"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    Admin
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        value="ROLE_USER"
                                        checked={role === "ROLE_USER"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    User
                                </label>
                            </div>
                        </div>
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
export default ModalUsersUpdate;
