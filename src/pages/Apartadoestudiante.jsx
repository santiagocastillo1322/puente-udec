import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Apartado.css";
import LogoUdec from "../assets/LogoUniversidad.png";
import {
  FaUser,
  FaFileAlt,
  FaBriefcase,
  FaBullhorn,
  FaClipboardCheck,
  FaSearch,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Veranuncios from "../components/Veranuncios";

function Apartadoestudiante() {
  const navigate = useNavigate();
  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [perfil, setPerfil] = useState({
    habilidades: "",
    idiomas: "",
    descripcion: "",
  });
  const [archivo, setArchivo] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarAnuncios, setMostrarAnuncios] = useState(false);

  // Mostrar siempre el anuncio al ingresar al menú
  useEffect(() => {
    setMostrarAnuncios(true);
  }, []);

  const handleCloseAnuncios = () => {
    setMostrarAnuncios(false);
  };

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Perfil Guardado:", perfil);
    console.log("Archivo Cargado:", archivo);
    alert("Información guardada con éxito");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen relative bg-[#427f20]">
      {/* NAVBAR */}
      <div className="w-full bg-gray-900 text-white p-4 flex items-center justify-between shadow-md absolute top-0 left-0 z-50">
        <div className="flex items-center space-x-4">
          <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-10" />
          <span className="text-lg font-bold">Egresados UdeC</span>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={menuAbierto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-6">
          <button onClick={() => navigate("/perfil-egresado")} className="hover:text-green-400">Perfil</button>
          <button onClick={() => navigate("/ofertas")} className="hover:text-green-400">Ofertas</button>
          <button onClick={() => navigate("/ver-estado")} className="hover:text-green-400">Ver estado de postulación</button>
          <button onClick={() => navigate("/")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            Cerrar sesión
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 p-4 z-40">
          <button onClick={() => navigate("/perfil-egresado")} className="hover:text-green-400">Perfil</button>
          <button onClick={() => navigate("/ofertas")} className="hover:text-green-400">Ofertas</button> 
          <button onClick={() => navigate("/ver-estado")} className="hover:text-green-400">Ver estado de postulación</button>
        </div>
      )}

      {/* MODAL DE ANUNCIOS */}
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
          <h2 className="text-3xl font-bold text-black mb-4">Bienvenido, egresado</h2>
          <p className="text-white text-lg leading-relaxed">
            Revisa tu perfil, postúlate a ofertas y sigue tus logros y hoja de vida en un solo lugar.
          </p>
        </div>

        {/* Sección derecha */}
        <div className="w-1/2 bg-[#0A0F1C] p-12 text-white flex flex-col gap-6 justify-start">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#111827] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button onClick={() => navigate("/perfil-egresado")} className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium">
              <FaUser /> Perfil
            </button>

            <button onClick={() => navigate("/ofertas")} className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium">
              <FaBriefcase /> Ofertas
            </button>

          

            <button onClick={() => navigate("/ver-estado")} className="flex items-center gap-3 bg-[#111827] hover:bg-green-500 transition py-3 px-5 rounded-lg font-medium">
              <FaClipboardCheck /> Ver estado de postulación
            </button>
          </div>

          {mostrarPerfil && (
            <div className="mt-6 bg-white text-black p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Perfil Profesional</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label>Habilidades (mínimo 3 palabras clave)</label>
                <input type="text" name="habilidades" value={perfil.habilidades} onChange={handleChange} required />

                <label>Idiomas</label>
                <input type="text" name="idiomas" value={perfil.idiomas} onChange={handleChange} required />

                <label>Descripción del perfil profesional</label>
                <textarea name="descripcion" value={perfil.descripcion} onChange={handleChange} required />

                <label>Subir Hoja de Vida (PDF)</label>
                <input type="file" accept=".pdf" onChange={handleFileChange} required />

                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Guardar Información
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Apartadoestudiante;







