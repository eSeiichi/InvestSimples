import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/">
          <img
            className={styles.logo}
            src="/logo/Logo.png"
            alt="InvestSimples"
          />
        </Link>
      </div>
      <div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link to="/cursos">Cursos</Link>
          </li>

          <li className={styles.item}>
            <Link to="/calc">Calculadora</Link>
          </li>
          <li className={styles.item}>
            <Link to="/auth/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
