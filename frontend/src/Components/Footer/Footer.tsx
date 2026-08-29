import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Profile from "../Profile/Profile";
import profileEnzo from "../../assets/enzo.jpeg";
import profileClaudio from "../../assets/claudio.jfif";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandColumn}>
            <Link className={styles.brand} to="/">
              <img className={styles.logo} src="/logo/Logo.png" alt="" />
              <span className={styles.brandName}>
                Invest<span className={styles.brandAccent}>Simples</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              Educação financeira descomplicada: cursos em vídeo, conteúdo prático e
              ferramentas para você dar o primeiro passo nos investimentos.
            </p>
          </div>

          <nav className={styles.linkGroup} aria-label="Informações">
            <p className={styles.linkTitle}>Informações</p>
            <ul>
              <li>
                <a href="#sobre">Sobre</a>
              </li>
              <li>
                <a href="#suporte">Suporte</a>
              </li>
              <li>
                <a href="#termos">Termos</a>
              </li>
            </ul>
          </nav>

          <nav className={styles.linkGroup} aria-label="Funções">
            <p className={styles.linkTitle}>Funções</p>
            <ul>
              <li>
                <Link to="/cursos">Cursos</Link>
              </li>
              <li>
                <Link to="/me">Perfil</Link>
              </li>
              <li>
                <Link to="/calc">Calculadora</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.devs}>
          <p className={styles.devsTitle}>Desenvolvido por</p>
          <div className={styles.profiles}>
            <Profile
              img={profileEnzo}
              alt="Foto de Enzo Seiichi Yamakawa"
              nome="Enzo Seiichi Yamakawa"
              cargo="Desenvolvimento"
            >
              <a
                href="https://github.com/eSeiichi"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub aria-hidden="true" /> eSeiichi
              </a>
              <a
                href="https://www.instagram.com/enzo_seiichi/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram aria-hidden="true" /> enzo_seiichi
              </a>
              <a
                href="https://br.linkedin.com/in/enzo-seiichi-yamakawa-37184a324"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin aria-hidden="true" /> Enzo S. Yamakawa
              </a>
            </Profile>

            <Profile
              img={profileClaudio}
              alt="Foto de Cláudio Camilo Rodrigues Moura"
              nome="Cláudio Camilo Rodrigues Moura"
              cargo="Desenvolvimento"
            >
              <a
                href="https://github.com/ClaudioCamiloRMoura"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub aria-hidden="true" /> ClaudioCamiloRMoura
              </a>
              <a
                href="https://www.instagram.com/claudio050408/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram aria-hidden="true" /> claudio050408
              </a>
            </Profile>
          </div>
        </div>

        <p className={styles.copyright}>
          © 2026 InvestSimples. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
