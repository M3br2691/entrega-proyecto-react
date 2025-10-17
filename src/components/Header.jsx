import NavBar from "./NavBar";
import styles from "./Header.module.css";
import UserIcon from "../assets/UserIcon";
import BagIcon from "../assets/BagIcon";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Mi Tienda</div>
      <NavBar />
      <div className={styles.icons}>
        <UserIcon />
        <BagIcon />
      </div>
    </header>
  );
}

export default Header;
