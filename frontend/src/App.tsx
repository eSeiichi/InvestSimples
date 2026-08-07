import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// importação dos layouts
import MainLayout from "./layout/MainLayout/MainLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout"

// importação das páginas
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";


function App() {
  return(
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        {/*arrumar essa parada aqui */}
         <Route path="/cursos" /> 
         <Route path="/" element={<Home/>}/>
      </Route>
      
      <Route element={<AuthLayout/>}>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/login" element={<Login/>}/>
      </Route>
    </Routes>
  </Router>
  )
}

export default App;
