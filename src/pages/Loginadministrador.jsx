import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoUdec from "../assets/LogoUniversidad.png";
import "../App.css";

function Loginadministrador() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Iniciando sesión con", email, password);

    // Validación
    if (email === "admin" && password === "admin123") {
      navigate("/apartado-administrador");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen relative" style={{ backgroundColor: "#427f20" }}>
      {/* Logo de la universidad */}
      <div className="absolute top-4 left-4">
        <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-12" />
      </div>
  
      <div className="bg-white rounded-2xl shadow-lg flex w-3/5 overflow-hidden">
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-green-500 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">¡Bienvenido!</h2>
          <p className="text-base">
            Accede con tu cuenta de administrador para estar al tanto de Puente Udec.
          </p>
        </div>
  
        {/* Sección Derecha */}
        <div className="w-1/2 bg-white text-black p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Iniciar sesión</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <button
              type="submit"
              onClick={() => navigate("/Apartado-administrador")}
              className="w-full bg-black text-green-500 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
            >
              Iniciar sesión
            </button>
  
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full text-green-600 hover:underline text-center mt-2"
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default Loginadministrador;
