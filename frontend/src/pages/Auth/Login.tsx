import { IoIosReturnLeft } from "react-icons/io";
import Input from "../../components/form/Input/Input";
import RedirectButton from "../../components/form/RedirectButton/RedirectButton";
import SubmitButton from "../../components/form/submitButton/SubmitButton";

function Login() {
  return (
    <>
      <RedirectButton link="/">
        <IoIosReturnLeft />
        <p>Voltar</p>
      </RedirectButton>

      <h1>Página de login</h1>
      <form>
        <Input
          type="text"
          text="Digite seu username:"
          name="username"
          placeholder="username"
        />
        <Input
          type="password"
          text="Digite sua senha:"
          name="password"
          placeholder="password"
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
