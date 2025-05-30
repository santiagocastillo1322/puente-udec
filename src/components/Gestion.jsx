import { useEffect, useState } from "react";
import { FaStar, FaCheck, FaTimes } from "react-icons/fa";
import Verestado from './Verestado'; 

function Gestion() {
  const [egresados, setEgresados] = useState([]);
  const [filtro, setFiltro] = useState("todos"); // todos, favoritos, considerados, rechazados
  const [estados, setEstados] = useState({}); // guardar estados por egresado

  useEffect(() => {
    fetch("http://localhost/obtener_estudiantes.php")
      .then(async res => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          return json;
        } catch (e) {
          console.error("Respuesta que rompió JSON:", text);
          throw new Error("Respuesta no es JSON válido.");
        }
      })
      .then(data => {
        setEgresados(data);
        // Cargar estados desde el almacenamiento local (solo mientras no hay backend)
        const guardados = JSON.parse(localStorage.getItem("estados") || "{}");
        setEstados(guardados);
      })
      .catch(err => console.error("Error cargando egresados:", err));
  }, []);

  const actualizarEstado = (correo, nuevoEstado) => {
    fetch("http://localhost/guardar_estado.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, estado: nuevoEstado })
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          return json;
        } catch (e) {
          console.error("Respuesta que rompió JSON:", text);
          throw new Error("Respuesta no es JSON válido.");
        }
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data); // 👈 Agrega esto para depurar
        if (data.success) {
          const nuevos = { ...estados, [correo]: nuevoEstado };
          setEstados(nuevos);
          localStorage.setItem("estados", JSON.stringify(nuevos));
        } else {
          alert("Error al actualizar estado: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al guardar estado:", err);
        alert("Error de conexión con el servidor.");
      });
  };
  
  

  const enviarEstadoFinal = async (correo) => {
    const estado = estados[correo];
  
    if (!estado) {
      alert("El estado del egresado no está disponible.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost/enviar_estado_final.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, estado }),
      });
  
      const data = await res.json();
      if (data.success) {
        alert("Estado enviado al egresado.");
      } else {
        alert("Error en servidor: " + (data.error || "Error desconocido"));
      }
    } catch (err) {
      console.error("Error al guardar estado:", err);
      alert("No se pudo contactar al servidor.");
    }
  };
  
  
  
  

  const egresadosFiltrados = egresados.filter(e => {
    const estado = estados[e.correo];
    if (filtro === "todos") return true;
    if (filtro === "favoritos") return estado === "favorito";
    if (filtro === "considerados") return estado === "considerado";
    if (filtro === "rechazados") return estado === "rechazado";
    return true;
  });

  return (
    <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-2xl mb-10 mx-auto">
      <h3 className="text-3xl font-bold mb-8 text-[#1b4d2c]">Gestión de Egresados</h3>
  
      {/* Botones de filtro */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={() => setFiltro("todos")} className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200">Todos</button>
        <button onClick={() => setFiltro("favoritos")} className="px-5 py-2 bg-yellow-100 text-yellow-800 rounded-lg shadow hover:bg-yellow-200">⭐ Favoritos</button>
        <button onClick={() => setFiltro("considerados")} className="px-5 py-2 bg-green-100 text-green-800 rounded-lg shadow hover:bg-green-200">✅ Considerados</button>
        <button onClick={() => setFiltro("rechazados")} className="px-5 py-2 bg-red-100 text-red-800 rounded-lg shadow hover:bg-red-200">❌ Rechazados</button>
      </div>
  
      {egresadosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-lg">No hay egresados en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {egresadosFiltrados.map((e, i) => (
            <div key={`${e.correo || "no-correo"}-${e.id || "no-id"}-${i}`} className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-lg mb-1"><strong className="text-green-800">Nombre:</strong> {e.nombre}</p>
              <p className="text-lg mb-1"><strong className="text-green-800">Correo:</strong> {e.correo}</p>
              <p className="text-lg mb-1"><strong className="text-green-800">Teléfono:</strong> {e.telefono}</p>
              <p className="text-lg mb-1"><strong className="text-green-800">Sede:</strong> {e.sede}</p>
              <p className="text-lg mb-3"><strong className="text-green-800">Carrera:</strong> {e.carrera}</p>
  
              <Verestado correo={e.correo} />
  
              <div className="flex gap-4 mt-4">
                <button onClick={() => actualizarEstado(e.correo, "favorito")} className="p-2 rounded-full bg-slate-900 hover:bg-slate-800">
                  <FaStar className="text-yellow-400" />
                </button>
                <button onClick={() => actualizarEstado(e.correo, "considerado")} className="p-2 rounded-full bg-slate-900 hover:bg-slate-800">
                  <FaCheck className="text-green-400" />
                </button>
                <button onClick={() => actualizarEstado(e.correo, "rechazado")} className="p-2 rounded-full bg-slate-900 hover:bg-slate-800">
                  <FaTimes className="text-red-400" />
                </button>
              </div>
  
              <button
                onClick={() => enviarEstadoFinal(e.correo)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Enviar estado
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default Gestion;



