import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./NavBar.module.css";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/cursos", label: "Cursos", end: false },
  { to: "/calc", label: "Calculadora", end: false },
];

function Navbar() {
  const [aberto, setAberto] = useState(false);

  function fecharMenu() {
    setAberto(false);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link className={styles.brand} to="/" onClick={fecharMenu}>
          <img className={styles.logo} src="/logo/Logo.png" alt="" />
          <span className={styles.brandName}>
            Invest<span className={styles.brandAccent}>Simples</span>
          </span>
        </Link>

        <button
          className={styles.toggle}
          type="button"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((estado) => !estado)}
        >
          {aberto ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`${styles.menu} ${aberto ? styles.menuAberto : ""}`}>
          <ul className={styles.list}>
            {links.map((link) => (
              <li className={styles.item} key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={fecharMenu}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.linkAtivo}` : styles.link
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link className={styles.loginButton} to="/auth/login" onClick={fecharMenu}>
            Entrar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
