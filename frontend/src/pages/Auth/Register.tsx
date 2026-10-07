import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosReturnLeft } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import Input from "../../Components/form/Input/Input";
import RedirectButton from "../../Components/form/RedirectButton/RedirectButton";
import SubmitButton from "../../Components/form/submitButton/SubmitButton";
import { register } from "../../api/auth";
import styles from "./Login.module.css";

function Register() {
  const navigate = useNavigate();

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const nome = form.get("nome") as string;
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const senha = form.get("senha") as string;

    setEnviando(true);
    setErro(null);

    try {
      await register({ nome, username, email, senha });
      navigate("/auth/login");
    } catch (error) {
      console.error(
        `Path: pages/auth/register \nFunction: handleSubmit \nError: ${error}`,
      );

      if (axios.isAxiosError(error)) {
        const detalhe = error.response?.data?.detail;
        setErro(
          typeof detalhe === "string"
            ? detalhe
            : "Não foi possível criar a conta. Tente novamente.",
        );
      } else {
        setErro("Não foi possível criar a conta. Tente novamente.");
      }
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
        <h1 className={styles.titulo}>Criar conta</h1>
        <p className={styles.subtitulo}>
          É rápido e gratuito. Comece a estudar hoje mesmo.
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
          type="text"
          text="Nome completo"
          name="nome"
          placeholder="Seu nome"
          autoComplete="name"
          required
          disabled={enviando}
        />

        <Input
          type="text"
          text="Nome de usuário"
          name="username"
          placeholder="Como quer ser chamado"
          autoComplete="username"
          disabled={enviando}
        />

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
          placeholder="Crie uma senha"
          autoComplete="new-password"
          required
          disabled={enviando}
        />

        <SubmitButton
          text={enviando ? "Criando conta..." : "Criar conta"}
          disabled={enviando}
        />
      </form>

      <p className={styles.rodape}>
        Já possui conta?{" "}
        <Link className={styles.link} to="/auth/login">
          Entrar
        </Link>
      </p>
    </div>
  );
}

export default Register;
