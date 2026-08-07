import Input from "../../form/Input/Input";
import SubmitButton from "../../form/submitButton/SubmitButton";

function Register() {
  return (
    <>
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
      </form>
    </>
  );
}
export default Register;
