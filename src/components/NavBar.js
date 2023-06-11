import './navbar.css'
import {redirect} from "react-router-dom";
import {role} from "../services/HttpRequest";

const logOut = async () => {
    await sessionStorage.removeItem('token')
    return redirect("/login")
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
                {role === "ROLE_ADMIN" &&
                    <li>
                        <a href="/users">users</a>
                    </li>
                }
            </ul>
            <ul>
                <a href="/profile">perfil</a>
                <a href="/login" onClick={logOut}>log out</a>
            </ul>
        </nav>
    )
}
export default NavBar;
