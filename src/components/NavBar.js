import './navbar.css'
import {Alert} from "react-bootstrap";

const logOut = async() => {
    await sessionStorage.removeItem('token')
}
const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/products">products</a>
                </li>
                <li>
                    <a href="/requests">requests</a>
                </li>
                <li>
                    <a href="/users">users</a>
                </li>
            </ul>
            <ul>
                <a href="/profile">perfil</a>
                <a href="/login" onClick={logOut}>log out</a>
            </ul>
        </nav>
    )
}
export default NavBar;