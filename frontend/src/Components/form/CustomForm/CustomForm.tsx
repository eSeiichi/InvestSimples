import styles from "./CustomForm.module.css"
import type { FormEvent, ReactNode } from "react"

type CustomFormProps = {
    onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

function CustomForm({onSubmit, children }: CustomFormProps){
    return(
        <form className={styles.formulario} onSubmit={onSubmit}>
            {children}
        </form>
    )
}
export default CustomForm