import Input from "../../form/Input/Input";
import RedirectButton from "../../form/RedirectButton/RedirectButton";
import SubmitButton from "../../form/submitButton/SubmitButton";
import { IoIosReturnLeft } from "react-icons/io";

function Register() {
  return (
    <>
      <RedirectButton link="/">
        <IoIosReturnLeft />
        <p>Voltar</p>
      </RedirectButton>
      <h1>Página de registro</h1>
      <form>
        <Input
          type="text"
          text="Digite seu nome completo:"
          name="nome"
          placeholder="nome"
        />
        <Input
          type="email"
          text="Digite seu email:"
          name="email"
          placeholder="abc@gmail.com"
        />
        <Input
          type="text"
          text="Crie um username:"
          name="username"
          placeholder="username"
        />

        <Input
          type="password"
          text="Crie uma senha:"
          name="password"
          placeholder="password"
        />
        <SubmitButton text="enviar" />
        <RedirectButton link="/auth/login">
          <p>Já possui conta?</p>
        </RedirectButton>
      </form>
    </>
  );
}
export default Register;
