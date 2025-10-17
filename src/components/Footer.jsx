

import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <ul className={styles.footerNav}>
        <li>
          <Link to="/acerca" className={styles.footerLink}>Acerca de Nosotros</Link>
        </li>
        <li>
          <Link to="/politica" className={styles.footerLink}>Política de Privacidad</Link>
        </li>
      </ul>

      <p className={styles.copyright}>
        © {anioActual} Pre Entrega Proyecto María Eugenia Barrena Reyes. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
