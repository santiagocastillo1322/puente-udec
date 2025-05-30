import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Loginestudiante from "./pages/Loginestudiante";
import Loginempresa from "./pages/Loginempresa";
import Formestudiante from "./pages/Formestudiante";
import Formempresa from "./pages/Formempresa";
import Apartadoestudiante from "./pages/Apartadoestudiante"; // Nuevo
import Apartadoempresa from "./pages/Apartadoempresa"; // Nuevo
import CrearVacante from "./components/CrearVacante";
import Ofertas from "./components/Ofertas";
import HojaDeVida from "./components/Hojadevida";
import Loginadministrador from "./pages/Loginadministrador";
import Apartadoadministrador from "./pages/Apartadoadministrador";
import Verofertas from "./components/Verofertas";
import Verestudiantes from "./components/Verestudiantes";
import Verempresas from "./components/Verempresas";
import Subiranuncios from "./components/Subiranuncios";
import Perfilegresado from "./components/perfilegresado";
import Aspirantes from "./components/Aspirantes";
import Menusecretoadmin from "./components/menusecretoadmin";
import Veranuncios  from "./components/veranuncios";
import Gestion from "./components/Gestion";
import Verestado from "./components/Verestado"; 
import Perfilempresa from "./components/Perfilempresa"; 
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login-estudiante" element={<Loginestudiante />} />
      <Route path="/login-empresa" element={<Loginempresa />} />
      <Route path="/form-estudiante" element={<Formestudiante />} />
      <Route path="/form-empresa" element={<Formempresa />} />
      <Route path="/apartado-estudiante" element={<Apartadoestudiante />} /> {/* Nuevo */}
      <Route path="/apartado-empresa" element={<Apartadoempresa />} /> {/* Nuevo */}
      <Route path="/Crear-Vacante" element={<CrearVacante />} />
      <Route path="/Ofertas" element={<Ofertas />} />
      <Route path="/Hoja-de-vida" element={<HojaDeVida />} />
      <Route path="/login-administrador" element={<Loginadministrador />} />
      <Route path="/apartado-administrador" element={<Apartadoadministrador />} />
      <Route path="/ver-ofertas" element={<Verofertas />} />
      <Route path="/ver-estudiantes" element={<Verestudiantes />} />
      <Route path="/ver-empresas" element={<Verempresas />} />
      <Route path="/subir-anuncios" element={<Subiranuncios />} />
      <Route path="/perfil-egresado" element={<Perfilegresado />} />
      <Route path="/Aspirantes" element={<Aspirantes />} />
      <Route path="/menusecretoadmin" element={<Menusecretoadmin />} />
      <Route path="/ver-anuncios" element={<Veranuncios />} />
      <Route path="/gestion" element={<Gestion/>} />
      <Route path="/ver-estado" element={<Verestado/>} />
<Route path="/perfil-empresa" element={<Perfilempresa/>} />
    </Routes>
  </BrowserRouter>
);


