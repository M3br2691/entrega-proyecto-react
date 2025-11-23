import { useContext } from "react";
import NavBar from "./NavBar";
import styles from "./headerStyles.module.css";
import UserIcon from "../assets/UserIcon";
import BagIcon from "../assets/BagIcon";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CarritoContext from "../context/CarritoContext";

const Header = () => {
  const { carrito } = useContext(CarritoContext);
  const { usuario, logout } = useAuthContext();
  const estaLogueado = !!usuario;
  const contadorEnCarrito = carrito.length;

  const navigate = useNavigate();

  return (
    <header className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-danger shadow-sm">

      <div className="logo fs-4 fw-bold text-white">Mi Tienda</div>

      <NavBar />

      <div className="d-flex align-items-center gap-2">
        {estaLogueado ? (
          <>
            <span className="text-white me-2">Hola, {usuario}</span>



            <button className="btn btn-outline-light btn-sm" onClick={() => { logout(); navigate("/"); }}>






              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-outline-light btn-sm d-flex align-items-center gap-1">
            <UserIcon /> Ingresar
          </Link>
        )}
      </div>



      {estaLogueado && (
        <div className={styles.iconoDeCarrito}>
          <Link to="/carrito" style={{ textDecoration: "none", color: "white" }}>
            <BagIcon className={styles.icono} />
            <span>Carrito</span>
            {contadorEnCarrito > 0 && (
              <span className={styles.contadorDeCarrito}>
                {contadorEnCarrito}
              </span>
            )}
          </Link>
        </div>
      )}

    </header>
  );
};

export default Header;
