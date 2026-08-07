import Profile from "../Profile/Profile";
import profileEnzo from "../../assets/enzo.jpeg";
import profileClaudio from "../../assets/claudio.jfif";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.profiles}>
        <Profile img={profileEnzo} alt="Enzo" nome="Enzo Seiichi Yamakawa">
          <div>
            <FaGithub color="green" fontSize="1.3em" />
            <a href="https://github.com/eSeiichi">eSeiichi</a>
          </div>
          <div>
            <FaInstagram color="green" fontSize="1.3em" />
            <a href="https://www.instagram.com/enzo_seiichi/">enzo_seiichi</a>
          </div>
          <div>
            <FaLinkedin color="green" fontSize="1.3em" />
            <a href="https://br.linkedin.com/in/enzo-seiichi-yamakawa-37184a324">
              Enzo S. Yamakawa
            </a>
          </div>
        </Profile>
        <Profile img={profileClaudio} alt="claudio" nome="Cláudio Camilo Rodrigues Moura">
          <div>
            <FaGithub color="green" fontSize="1.3em" />
            <a href="https://github.com/ClaudioCamiloRMoura">ClaudioCamiloRMoura</a>
          </div>
          <div>
            <FaInstagram color="green" fontSize="1.3em" />
            <a href="https://www.instagram.com/claudio050408/">claudio050408</a>
          </div>
          <div>
            <FaLinkedin color="green" fontSize="1.3em" />
            <a href="">
              não tem
            </a>
          </div>
        </Profile>
      </div>

      <div className={styles.links}>
        <div className={styles.linkGroup}>
          <p>Informações</p>
          <ul>
            <li>
              <a href="">Sobre</a>
            </li>
            <li>
              <a href="">Suporte</a>
            </li>
            <li>
              <a href="">termos</a>
            </li>
          </ul>
        </div>
        <div className={styles.linkGroup}>
          <p>Funções</p>
          <ul>
            <li>
              <Link to="/cursos">cursos</Link>
            </li>
            <li>
              <Link to="/auth/me">perfil</Link>
            </li>
            <li>
              <Link to="/calculadora">calculadora</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.copyright}>
        © 2026 InvestSimples. Todos os direitos reservados.
      </p>
    </footer>
  );
}
export default Footer;
