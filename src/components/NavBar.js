import './navbar.css'


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
                <a href="/login">log out</a>
            </ul>
        </nav>
    )
}
export default NavBar;
