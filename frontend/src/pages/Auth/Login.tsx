import { IoIosReturnLeft } from "react-icons/io";
import Input from "../../components/form/Input/Input";
import RedirectButton from "../../components/form/RedirectButton/RedirectButton";
import SubmitButton from "../../components/form/submitButton/SubmitButton";
import {login} from "../../api/auth"


function Login() {


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const email = form.get("email") as string;
    const senha = form.get("senha") as string;

    try {
      const response = await login({
        email,
        senha,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <RedirectButton link="/">
        <IoIosReturnLeft />
        <p>Voltar</p>
      </RedirectButton>

      <h1>Página de login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          text="Digite seu email:"
          name="email"
          placeholder="abc@gmail.com"
        />
        <Input
          type="password"
          text="Digite sua senha:"
          name="senha"
          placeholder="senha"
        />
        <SubmitButton text="enviar" />

        <RedirectButton link="/auth/register">
          <p>Não possui conta? Crie uma!</p>
        </RedirectButton>
      </form>
    </>
  );
}
export default Login;
