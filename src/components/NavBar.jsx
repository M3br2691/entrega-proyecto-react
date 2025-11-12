import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

const NavBar = () => {
  return (
    
    <nav className={styles.nav}>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/tecnologia" className={styles.link}> Tecnologia </Link>
          <Link to="/indumentaria" className={styles.link}> Indumentaria </Link>
          <Link to="/admin" className={styles.link}>  Admin </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
