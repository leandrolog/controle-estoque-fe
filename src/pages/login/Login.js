import './login.css'
import {ToastContainer} from "react-toastify";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import 'react-toastify/dist/ReactToastify.css';
import {HttpRequest} from "../../services/HttpRequest";

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()
        const credential = {email, password}
        try {
            const response = await HttpRequest.post("/login", credential)
            const token = response.data;
            sessionStorage.setItem('token', token);
            NotifySuccess()
            setTimeout(() => {
                navigate('/products')
            }, 1500)
        } catch (error) {
            NotifyError()
        }
    }

    return (
        <body className="login-body">
        <div className="login-container">
            <h1 className="login-title">Estoque Flex</h1>
            <ToastContainer position="top-center" closeOnClick pauseOnHover theme="light"/>
            <form className="login-form">
                <input
                    className="login-input"
                    placeholder="Email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <Button
                className="btn-in"
                onClick={handleLogin}
            >
                Entrar
            </Button>
        </div>
        </body>
    )
}
export default Login;
