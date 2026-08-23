import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// importação dos layouts
import MainLayout from "./layout/MainLayout/MainLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout";

// importação das páginas
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Cursos from "./pages/Course/Cursos";
import Curso from "./pages/Course/Curso";
import Aula from "./pages/Course/Aula";
import Calc from "./pages/Calc/Calc";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {/*Home path*/}
          <Route path="/" element={<Home />} />
          {/* courses path */}
          <Route path="/cursos" element={<Cursos/>}/>
          <Route path="cursos/:cursoId" element={<Curso/>}/>
          <Route path="cursos/:cursoId/aulas/:aulaId" element={<Aula/>}/>
          {/* Calc path*/}
          <Route path="/calc" element={<Calc/>}/>
          {/* Me path */}
          <Route path="/me" />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
