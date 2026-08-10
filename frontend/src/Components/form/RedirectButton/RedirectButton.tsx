import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./RedirectButton.module.css"

type RedirectButtonProps ={
    link:string;
    children:ReactNode;
}

function RedirectButton({ link, children }: RedirectButtonProps) {
    return (
        <Link className={styles.button} to={link}>
            {children}
        </Link>
    );
}
export default RedirectButton