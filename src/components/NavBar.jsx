import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { usuario } = useAuthContext();

  return (
<nav>
  <ul className="navbar-nav d-flex flex-column flex-md-row gap-2">
    <li className="nav-item"><Link className="nav-link text-white" to="/">Inicio</Link></li>
    <li className="nav-item"><Link className="nav-link text-white" to="/tecnologia">Tecnología</Link></li>
    <li className="nav-item"><Link className="nav-link text-white" to="/indumentaria">Indumentaria</Link></li>
    {usuario === "admin" && (
      <li className="nav-item"><Link className="nav-link text-white" to="/admin">Admin</Link></li>
    )}
  </ul>
</nav>
  );
};

export default NavBar;
