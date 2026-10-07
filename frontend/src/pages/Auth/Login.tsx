import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import Input from "../../Components/form/Input/Input";
import RedirectButton from "../../Components/form/RedirectButton/RedirectButton";
import SubmitButton from "../../Components/form/submitButton/SubmitButton";
import { login } from "../../api/auth";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const senha = form.get("senha") as string;

    setEnviando(true);
    setErro(null);

    try {
      const resposta = await login({ email, senha });

      // o interceptor do axios lê esse token para autenticar as próximas chamadas
      localStorage.setItem("access_token", resposta.access_token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErro("E-mail ou senha incorretos. Confira os dados e tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={styles.pagina}>
      <RedirectButton link="/">
        <IoIosReturnLeft aria-hidden="true" />
        <p>Voltar para o site</p>
      </RedirectButton>

      <header className={styles.cabecalho}>
        <h1 className={styles.titulo}>Entrar na sua conta</h1>
        <p className={styles.subtitulo}>
          Acesse para continuar de onde parou nos seus cursos.
        </p>
      </header>

      {erro && (
        <p className={styles.erro} role="alert">
          <FaExclamationCircle aria-hidden="true" />
          <span>{erro}</span>
        </p>
      )}

      <form className={styles.formulario} onSubmit={handleSubmit}>
        <Input
          type="email"
          text="E-mail"
          name="email"
          placeholder="voce@email.com"
          autoComplete="email"
          required
          disabled={enviando}
        />

        <Input
          type="password"
          text="Senha"
          name="senha"
          placeholder="Sua senha"
          autoComplete="current-password"
          required
          disabled={enviando}
        />

        <SubmitButton text={enviando ? "Entrando..." : "Entrar"} disabled={enviando} />
      </form>

      <p className={styles.rodape}>
        Não possui conta?{" "}
        <Link className={styles.link} to="/auth/register">
          Crie uma agora
        </Link>
      </p>
    </div>
  );
}

export default Login;
