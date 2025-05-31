import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoUdec from "../assets/LogoUniversidad.png";
import "../App.css";

function Loginestudiante() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("https://puenteudec1.infinityfreeapp.com/login_estudiante.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password, // 👈 sin "ñ"
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log("Inicio de sesión exitoso:", data);
  
        // Guarda el ID en localStorage
        localStorage.setItem("idEgresado", data.id_egresado);
        localStorage.setItem("correo", email);
        // Redirige al apartado del estudiante
        navigate("/apartado-estudiante");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor");
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen w-screen relative" style={{ backgroundColor: "#427f20" }}>
      {/* Logo de la universidad */}
      <div className="absolute top-4 left-4">
        <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-12" />
      </div>
  
      <div className="bg-white rounded-3xl shadow-2xl flex w-[850px] overflow-hidden">
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-gradient-to-br from-green-600 to-green-500 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">¡Bienvenido!</h2>
          <p className="text-lg leading-relaxed">
            Accede con tu cuenta de egresado para explorar oportunidades laborales y más.
          </p>
        </div>
  
        {/* Sección Derecha */}
        <div className="w-1/2 bg-white text-gray-800 p-10">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-6">Iniciar Sesión</h2>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Iniciar sesión
            </button>
  
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full text-green-700 hover:text-green-800 mt-2 text-sm underline transition"
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  

}

export default Loginestudiante;









