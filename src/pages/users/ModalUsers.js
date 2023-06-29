import React from "react";
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ModalBody} from "react-bootstrap";
import {HttpRequest} from "../../services/HttpRequest";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function ModalUsers({title, getUsers}) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [department, setDepartment] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()

    const createRequest = async (e) => {
        e.preventDefault()
        const request = {name, email, department, password, role}
        try {
            await HttpRequest.post("/new-user", request)
            NotifySuccess("Usuário cadastrado com sucesso!")
            getUsers()
            handleClose()
            console.log("request", request)

        } catch (error) {
            console.log("deu erro", error)
            NotifyError("Erro ao cadastrar usuário!")
        }
    }
    return (
        <div>
            <ToastContainer position="top-center" closeOnClick pauseOnHover theme="light"/>
            <Button variant="primary" onClick={handleOpen}>{title}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Register new User</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <form>
                        <InputWithLabel
                            title="Nome:"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Email:"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Senha:"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <InputWithLabel
                            title="Setor:"
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
                        <Button className="button-save" onClick={createRequest}>
                            Save
                        </Button>
                    </Modal.Footer>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ModalUsers;
