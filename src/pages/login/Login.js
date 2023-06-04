import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";
import {ToastContainer} from "react-toastify";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {NotifyError, NotifySuccess} from "../../components/Notify";
import 'react-toastify/dist/ReactToastify.css';
import HttpRequest from "../../services/HttpRequest";

function Login (){

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
                if (token) {
                    navigate("/")
                }
            }, '1000')
        } catch (error) {
            NotifyError()
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <ToastContainer position="top-center" closeOnClick pauseOnHover theme="light"/>
            <form>
                <InputWithLabel
                    title="Email:"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputWithLabel
                    title="Password:"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

            </form>
            <Button
                className="btn-in"
                onClick={handleLogin}
            >
                Enter
            </Button>
        </div>
    )
}
export default Login;
