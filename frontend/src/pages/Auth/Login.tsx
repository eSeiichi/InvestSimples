import Input from "../../form/Input/Input"
import SubmitButton from "../../form/submitButton/SubmitButton"

function Login(){
    return (
        <>
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
                <SubmitButton
                    text="enviar"
                />
            </form>
        </>
    )
}
export default Login