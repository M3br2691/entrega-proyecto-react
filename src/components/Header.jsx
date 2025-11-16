import { useContext } from "react";
import NavBar from "./NavBar";
import styles from "./header.module.css";
import UserIcon from "../assets/UserIcon";
import BagIcon from "../assets/BagIcon";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CarritoContext from "../context/CarritoContext";

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useAuthContext();
  const estaLogueado = !!usuario;
  const contadorEnCarrito = carrito.length;

  return (
    <header className={styles.header}>
   
      <div className={styles.logo}>Mi Tienda</div>

     
      <NavBar />

      
      <div className={styles.icons}>
        {estaLogueado ?
          <button onClick={logout} className={styles.login}>Cerrar Sesión </button>
          :
          <Link to="/login">
            <button className={styles.login}>
              <UserIcon /> <span>Ingresar</span>
            </button>
          </Link>
        }
      </div>

      <div className={styles.iconoDeCarrito}>
        <Link to="/carrito">
          <BagIcon className={styles.icono} />
          <span>Carrito</span>
          {contadorEnCarrito > 0 && (
            <span className={styles.contadorDeCarrito}>
              {contadorEnCarrito}
            </span>
          )}
        </Link>
      </div>


    </header>
  );
}

export default Header;

