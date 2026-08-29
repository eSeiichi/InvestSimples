import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.layout}>
      <NavBar />

      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
