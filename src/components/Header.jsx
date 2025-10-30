import NavBar from "./NavBar";
import styles from "./Header.module.css";
import UserIcon from "../assets/UserIcon";
import BagIcon from "../assets/BagIcon";
import { Link } from "react-router-dom"; 

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mi Tienda</div>
      <NavBar />
      <div className={styles.icons}>
        <UserIcon />
        {/* 👇 Hacemos que el ícono del carrito lleve a la ruta /carrito */}
        <Link to="/carrito">
          <BagIcon />
        </Link>
      </div>
    </header>
  );
}

export default Header;
