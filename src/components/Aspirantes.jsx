import { useEffect, useState } from "react";

function Aspirantes() {
  const [aspirantes, setAspirantes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id_empresa = localStorage.getItem("id_empresa");

    fetch(`http://localhost/obtener_estudiantes.php?id_empresa=${id_empresa}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAspirantes(data);
        } else {
          setError(data.message || "Respuesta inesperada del servidor.");
          console.error("Respuesta inesperada del servidor:", data);
        }
      })
      .catch((err) => {
        setError("Error de red o de servidor.");
        console.error("Error cargando aspirantes:", err);
      });
  }, []);

  return (
    <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-2xl mb-10 mx-auto">
      <h3 className="text-3xl font-bold mb-8 text-[#1b4d2c]">Aspirantes Registrados</h3>

      {error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : aspirantes.length === 0 ? (
        <p className="text-gray-500 text-lg">No hay aspirantes registrados aún.</p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {aspirantes.map((a, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <p className="text-lg mb-1"><span className="font-semibold text-green-800">Nombre:</span> {a.nombre}</p>
              <p className="text-lg mb-1"><span className="font-semibold text-green-800">Correo:</span> {a.correo}</p>
              <p className="text-lg mb-1"><span className="font-semibold text-green-800">Teléfono:</span> {a.telefono}</p>
              <p className="text-lg mb-1"><span className="font-semibold text-green-800">Sede:</span> {a.sede}</p>
              <p className="text-lg mb-1"><span className="font-semibold text-green-800">Carrera:</span> {a.carrera}</p>
              <p className="text-lg mt-2">
                <span className="font-semibold text-green-800">Hoja de Vida:</span>{" "}
                {a.pdf_path ? (
                  <a
                    href={a.pdf_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Ver PDF
                  </a>
                ) : (
                  <span className="text-gray-500">No disponible</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Aspirantes;





