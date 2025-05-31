import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const carrerasPorSede = {
  Fusagasugá: [
    "Administración de empresas",
    "Contaduría pública",
    "Licenciatura en ciencias sociales",
    "Ingeniería Electrónica",
    "Ingeniería de Sistemas y Computación",
    "Ingeniería Agronómica",
    "Zootecnia",
    "Licenciatura en educación física, recreación y deportes",
  ],
  Girardot: [
    "Administración de empresas",
    "Ingeniería Ambiental",
    "Ingeniería de Software",
    "Enfermería",
  ],
  Ubaté: [
    "Administración de empresas",
    "Contaduría pública",
    "Ingeniería de Sistemas y Computación",
    "Zootecnia",
    "Medicina Veterinaria y Zootecnia",
  ],
  Chía: [
    "Administración de empresas",
    "Contaduría pública",
    "Ingeniería de Sistemas y Computación",
    "Ingeniería Industrial",
    "Ingeniería Mecatrónica",
  ],
  Facatativá: [
    "Administración de empresas",
    "Contaduría pública",
    "Ingeniería de Sistemas y Computación",
    "Ingeniería Agronómica",
    "Ingeniería Ambiental",
    "Psicología",
  ],
  Zipaquirá: ["Música"],
  Soacha: [
    "Profesional en Ciencias del Deporte",
    "Ingeniería Industrial",
    "Ingeniería de Software",
    "Ingeniería Topográfica y Geomática",
  ],
};

export default function Perfilegresado() {
  const [datos, setDatos] = useState({
    id_egresado: "",
    nombre: "",
    correo: "",
    telefono: "",
    sede: "Fusagasugá",
    carrera: "Administración de empresas",
    pdf: null,
  });

  const [carrerasDisponibles, setCarrerasDisponibles] = useState(carrerasPorSede["Fusagasugá"]);
  const navigate = useNavigate();

  // 🔑 Cargar ID desde localStorage
  useEffect(() => {
    const idGuardado = localStorage.getItem("idEgresado");
    if (idGuardado) {
      setDatos((prev) => ({ ...prev, id_egresado: idGuardado }));
    } else {
      alert("No se ha identificado al egresado.");
    }
  }, []);

  useEffect(() => {
    setCarrerasDisponibles(carrerasPorSede[datos.sede] || []);
    setDatos((prev) => ({
      ...prev,
      carrera: carrerasPorSede[datos.sede]?.[0] || "",
    }));
  }, [datos.sede]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDatos((prev) => ({ ...prev, pdf: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!datos.id_egresado) {
      alert("No se ha identificado al egresado.");
      return;
    }

    const formData = new FormData();
    formData.append("id_egresado", datos.id_egresado);
    formData.append("nombre", datos.nombre);
    formData.append("correo", datos.correo);
    formData.append("telefono", datos.telefono);
    formData.append("sede", datos.sede);
    formData.append("carrera", datos.carrera);
    formData.append("pdf", datos.pdf);

    fetch("https://puenteudec1.infinityfreeapp.com/guardar_perfil.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          alert("Información guardada correctamente");
          setDatos({
            id_egresado: datos.id_egresado,
            nombre: "",
            correo: "",
            telefono: "",
            sede: "Fusagasugá",
            carrera: carrerasPorSede["Fusagasugá"][0] || "",
            pdf: null,
          });
        } else {
          alert("Error al guardar la información.");
          console.error("Error al guardar:", response.error);
        }
      })
      .catch((error) => {
        alert("Error al conectar con el servidor.");
        console.error("Error en la petición:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-800">
          Formulario del Egresado
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={datos.correo}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Número de teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sede</label>
            <select
              name="sede"
              value={datos.sede}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              {Object.keys(carrerasPorSede).map((sede) => (
                <option key={sede} value={sede}>
                  {sede}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Carrera</label>
            <select
              name="carrera"
              value={datos.carrera}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            >
              {carrerasDisponibles.map((carrera, idx) => (
                <option key={idx} value={carrera}>
                  {carrera}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subir Hoja de Vida (PDF)</label>
            <input
              type="file"
              name="pdf"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300"
          >
            Guardar Información
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/hoja-de-vida")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Ir a Hoja de Vida
          </button>
        </div>
      </div>
    </div>
  );
}
