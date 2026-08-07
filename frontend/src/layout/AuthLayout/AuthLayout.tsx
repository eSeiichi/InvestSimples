import {Outlet} from 'react-router-dom'
import styles from './AuthLayout.module.css'

function AuthLayout(){
    return(
        <div className={styles.container}>
            <header>
                <h1>logo</h1>
            </header>
            <main>
                <Outlet />
            </main>

        </div>
    )
}
export default AuthLayout