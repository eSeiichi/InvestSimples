import Input from "../../components/form/Input/Input";
import RedirectButton from "../../components/form/RedirectButton/RedirectButton";
import SubmitButton from "../../components/form/submitButton/SubmitButton";
import { IoIosReturnLeft } from "react-icons/io";
import {register} from "../../api/auth"

function Register() {
  async function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const nome = form.get("nome") as string;
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const senha = form.get("senha") as string;

    try{
      const response = await register(
        {nome,
        username,
        email,
        senha}
      );
      console.log(response)
    } catch(error){
      console.error(`Path: pages/auth/register \nFunction: handleSubmit \nError: ${error}`)
      console.log(`Status: ${error.response?.Status}`)
      console.log(`Data: ${error.response?.data}`)
    }
  }

  return (
    <>
      <RedirectButton link="/">
        <IoIosReturnLeft />
        <p>Voltar</p>
      </RedirectButton>
      <h1>Página de registro</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          text="Digite seu nome completo:"
          name="nome"
          placeholder="nome"
        />

        <Input
          type="text"
          text="Crie um username:"
          name="username"
          placeholder="username"
        />

        <Input
          type="email"
          text="Digite seu email:"
          name="email"
          placeholder="abc@gmail.com"
        />

        <Input
          type="password"
          text="Crie uma senha:"
          name="senha"
          placeholder="senha"
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
