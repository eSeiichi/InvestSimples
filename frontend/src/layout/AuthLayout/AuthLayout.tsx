import { Link, Outlet } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./AuthLayout.module.css";

const destaques = [
  "Cursos em vídeo do básico ao avançado",
  "Calculadora de juros, IR, CDI e IPCA",
  "Continue de onde parou, em qualquer aparelho",
];

function AuthLayout() {
  return (
    <div className={styles.container}>
      {/* painel de marca — some no mobile, virando só o cabeçalho */}
      <aside className={styles.marca}>
        <Link className={styles.brand} to="/">
          <img className={styles.logo} src="/logo/Logo.png" alt="" />
          <span className={styles.brandName}>
            Invest<span className={styles.brandAccent}>Simples</span>
          </span>
        </Link>

        <div className={styles.marcaTexto}>
          <h2 className={styles.marcaTitulo}>
            Educação financeira sem complicação
          </h2>
          <p className={styles.marcaSubtitulo}>
            Entre para acompanhar seus cursos e usar as ferramentas do
            InvestSimples.
          </p>

          <ul className={styles.destaques}>
            {destaques.map((item) => (
              <li key={item}>
                <FaCheckCircle aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.painel}>
        <div className={styles.cartao}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
