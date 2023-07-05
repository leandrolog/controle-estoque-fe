import './navbar.css';
import { redirect } from "react-router-dom";
import { role } from "../services/HttpRequest";

const logOut = async () => {
  await sessionStorage.removeItem('token');
  return redirect("/login");
};

const NavBar = () => {
  return (
    <nav>
      <ul>
        {role === "ROLE_ADMIN" && (
          <li>
            <a href="/users">Usuários</a>
          </li>
        )}
        <li>
          <a href="/products">Estoque</a>
        </li>
        <li>
          <a href="/requests">Controle de Solicitações</a>
        </li>
      </ul>
      <ul className="logout-container">
        <li>
          <a href="/login" onClick={logOut}>Sair</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
