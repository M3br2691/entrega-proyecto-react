import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useAuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { usuario } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <ul className={styles.lista}>
        <li><Link to="/" className={styles.link}>Inicio</Link></li>
        <li><Link to="/tecnologia" className={styles.link}>Tecnologia</Link></li>
        <li><Link to="/indumentaria" className={styles.link}>Indumentaria</Link></li>

        {usuario === "admin" && (
          <li><Link to="/admin" className={styles.link}>Admin</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
