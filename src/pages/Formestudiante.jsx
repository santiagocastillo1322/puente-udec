import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const habilidadesOptions = [
  { value: "programacion", label: "Programación" },
  { value: "diseno", label: "Diseño" },
  { value: "marketing", label: "Marketing" },
  { value: "analisis", label: "Análisis de Datos" },
  { value: "gestion", label: "Gestión de Proyectos" },
];

function Formestudiante() {
  const [habilidades, setHabilidades] = useState([]);
  const [idiomas, setIdiomas] = useState("");
  const [perfil, setPerfil] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", { habilidades, idiomas, perfil });
    navigate("/apartado-estudiante");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen" style={{ backgroundColor: "#427f20" }}>
      <div className="bg-white rounded-2xl shadow-lg flex w-3/5">
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-green-500 text-white p-10 flex flex-col justify-center rounded-l-2xl">
          <h2 className="text-3xl font-bold">¡Bienvenido!</h2>
          <p className="mt-4 text-lg">
            Completa tu información adicional para mejorar tu perfil y obtener mejores oportunidades.
          </p>
        </div>

        {/* Sección Derecha */}
        <div className="w-1/2 bg-gray-900 text-white p-10 flex flex-col justify-center rounded-r-2xl">
          <h1 className="text-2xl font-bold text-green-400 text-center mb-4">Información Adicional</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold">Habilidades (mínimo 3 palabras clave)</label>
              <Select
                options={habilidadesOptions}
                isMulti
                value={habilidades}
                onChange={setHabilidades}
                className="mt-2 text-black"
                placeholder="Selecciona habilidades..."
              />
            </div>

            <div>
              <label className="block font-semibold">Idiomas</label>
              <input
                type="text"
                placeholder="Ej: Español, Inglés, Francés"
                value={idiomas}
                onChange={(e) => setIdiomas(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-400"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Perfil Profesional</label>
              <textarea
                placeholder="Describe tu perfil profesional"
                value={perfil}
                onChange={(e) => setPerfil(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formestudiante;



