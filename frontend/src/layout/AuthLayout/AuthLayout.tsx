import {Outlet} from 'react-router-dom'

function AuthLayout(){
    return(
        <div>
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