import { Outlet } from "react-router-dom";

// importação de componentes
import NavBar from "../../components/NavBar/NavBar";



function MainLayout() {
    return (
        <>
            <header>
                <NavBar/>
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                {/* Footer */}
            </footer>
        </>
    );
}

export default MainLayout;