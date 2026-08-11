import {Outlet} from 'react-router-dom'
import styles from './AuthLayout.module.css'

function AuthLayout(){
    return(
        <div className={styles.container}>
            <header>
                <img src="/logo/Logo.png" alt="logo" className={styles.logo}/>
            </header>
            <main>
                <Outlet />
            </main>

        </div>
    )
}
export default AuthLayout