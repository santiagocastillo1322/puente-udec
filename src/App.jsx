import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import empresaimagen from "./assets/empresa.png";
import estudianteimagen from "./assets/estudiante.png";
import LogoUdec from "./assets/LogoUniversidad.png";
import Menusecretoadmin from "./components/menusecretoadmin";
import "./App.css";
import "./index.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#427f20]">
  {/* Logo superior izquierdo */}
  <div className="absolute top-4 left-4">
    <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-12" />
  </div>
 
      {/* Botón secreto administrador */}
      <Menusecretoadmin />

       {/* Panel principal */}
       <div className="flex w-[1000px] h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-green-900/30">

    
    {/* Lado Izquierdo */}
    <div className="w-1/2 bg-green-500 text-white p-10 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-4">¡Bienvenido!</h2>
      <p className="text-lg leading-relaxed">
        Selecciona tu rol para acceder a las funciones disponibles según tu perfil.
      </p>
    </div>

    {/* Lado Derecho */}
    <div className="w-1/2 bg-gray-900 text-white p-10 flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold text-center mb-2 text-gray-300">Acceder como:</h3>
      <div className="flex space-x-10 mt-4">
        {/* Botón Egresado */}
        <button
          onClick={() => navigate("/login-estudiante")}
          className="bg-gray-800 hover:bg-green-500 p-6 rounded-xl flex flex-col items-center transition duration-300"
        >
          <img src={estudianteimagen} alt="Egresado" className="w-20 h-20 mb-3" />

          <span className="font-medium">Egresado</span>
        </button>

        {/* Botón Empresa */}
        <button
          onClick={() => navigate("/login-empresa")}
          className="bg-gray-800 hover:bg-green-500 p-6 rounded-xl flex flex-col items-center transition duration-300"
        >
     <img src={empresaimagen} alt="Empresa" className="w-20 h-20 mb-3" />

          <span className="font-medium">Empresa</span>
        </button>
      </div>
    </div>
  </div>
</div>
  );
}




export default Home;

function Loginestudiante() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página

    console.log("Intentando iniciar sesión con:", email, password);

    // Simulación de autenticación (reemplazar con API real)
    if (email === "test@example.com" && password === "123456") {
      navigate("/apartado-estudiante", { replace: true });  // Redirige después del login
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-700">
      <div className="bg-white rounded-2xl shadow-lg flex w-3/5">
        
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-green-500 text-white p-10 flex flex-col justify-center rounded-l-2xl">
          <h2 className="text-3xl font-bold">¡Bienvenido Estudiante!</h2>
          <p className="mt-4 text-lg">
            Inicia sesión con tu cuenta de estudiante para acceder a tus oportunidades laborales y más.
          </p>
        </div>

        {/* Sección Derecha */}
        <div className="w-1/2 bg-gray-900 text-white p-10 flex flex-col justify-center rounded-r-2xl">
          <h1 className="text-2xl font-bold text-green-400 text-center mb-4">Iniciar Sesión</h1>

          {/* Formulario con onSubmit */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-400"
              required
            />
            <input 
              type="password" 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-400"
              required
            />
            <button 
            
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Loginestudiante };
















