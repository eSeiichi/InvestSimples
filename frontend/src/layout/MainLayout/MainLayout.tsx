import { Outlet } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
// modo demonstração (remover junto com src/mocks)
import DemoBanner from "../../mocks/DemoBanner";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.layout}>
      <DemoBanner />
      <NavBar />

      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
