import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// importação dos layouts
import MainLayout from "./layout/MainLayout/MainLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout"

// importação das páginas
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

// importação dos componentes
import NavBar from "./components/NavBar/NavBar";

function App() {
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/cursos" />
      </Route>
      
      <Route element={<AuthLayout/>}>
        <Route path="/regiter" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
  </Router>
}

export default App;
