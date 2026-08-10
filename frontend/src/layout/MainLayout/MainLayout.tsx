import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.layout}>
      <header>
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
