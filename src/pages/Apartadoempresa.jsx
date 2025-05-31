import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 // Asegúrate de que esta ruta esté bien

import Veranuncios  from "../components/veranuncios";

import LogoUdec from "../assets/LogoUniversidad.png";
import "./Apartado.css";
import {
  FaSearch,
  FaFileAlt,
  FaUsers,
  FaClipboardList,
  FaBullhorn,
} from "react-icons/fa";
import { motion } from "framer-motion";


function Apartadoempresa() {
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarAnuncios, setMostrarAnuncios] = useState(false);

  useEffect(() => {
    // Mostrar el anuncio automáticamente al entrar
    setMostrarAnuncios(true);
  }, []);

  const handleCloseAnuncios = () => {
    setMostrarAnuncios(false);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen relative bg-[#427f20]">
      {/* NAVBAR */}
      <div className="w-full bg-gray-900 text-white p-4 flex items-center justify-between shadow-md absolute top-0 left-0 z-50">
        <div className="flex items-center space-x-4">
          <img
            src={LogoUdec}
            alt="Logo Universidad de Cundinamarca"
            className="h-10"
          />
          <span className="text-lg font-bold">Empresas UdeC</span>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuAbierto
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => navigate("/perfil-empresa")}
            className="hover:text-green-400"
          >
            Perfil de la empresa
          </button>
          <button
            onClick={() => navigate("/crear-vacante")}
            className="hover:text-green-400"
          >
            Crear Oferta
          </button>
          <button
            onClick={() => navigate("/aspirantes")}
            className="hover:text-green-400"
          >
            Aspirantes
          </button>
          <button
            onClick={() => navigate("/gestion")}
            className="hover:text-green-400"
          >
            Gestión
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 p-4 z-40">
          <button
            onClick={() => navigate("/perfil-empresa")}
            className="hover:text-green-400"
          >
            Perfil de la empresa
          </button>
          <button
            onClick={() => navigate("/crear-vacante")}
            className="hover:text-green-400"
          >
            Crear Oferta
          </button>
          <button
            onClick={() => navigate("/aspirantes")}
            className="hover:text-green-400"
          >
            Aspirantes
          </button>
          <button
            onClick={() => navigate("/gestion")}
            className="hover:text-green-400"
          >
            Gestión
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Modal del anuncio más reciente */}
      {mostrarAnuncios && (
        <Veranuncios
          onClose={handleCloseAnuncios}
          isModal={true}
          onVerAnunciosClick={() => {
            handleCloseAnuncios();
            navigate("/ver-anuncios");
          }}
        />
      )}

      {/* CONTENIDO PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-[1200px] min-h-[550px] rounded-2xl overflow-hidden shadow-2xl mt-24"
      >
        {/* Sección izquierda */}
        <div className="w-1/2 bg-[#00C851] p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Bienvenido, empresa
          </h2>
          <p className="text-white text-lg leading-relaxed">
            Publica ofertas, gestiona aspirantes y encuentra el mejor talento
            para tu organización.
          </p>
        </div>

        {/* Sección derecha */}
        <div className="w-1/2 bg-[#0A0F1C] p-12 text-white flex flex-col gap-6 justify-start">
          {/* Buscador */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#111827] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/perfil-empresa")}
              className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium"
            >
              <FaBullhorn /> Perfil de la empresa
            </button>
            <button
              onClick={() => navigate("/crear-vacante")}
              className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium"
            >
              <FaFileAlt /> Crear Oferta
            </button>
            <button
              onClick={() => navigate("/aspirantes")}
              className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium"
            >
              <FaUsers /> Aspirantes
            </button>
            <button
              onClick={() => navigate("/gestion")}
              className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium"
            >
              <FaClipboardList /> Gestión
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Apartadoempresa;






