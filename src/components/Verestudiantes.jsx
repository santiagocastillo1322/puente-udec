import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Verestudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://puenteudec1.infinityfreeapp.com/htdocs/obtener_estudiantes.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setEstudiantes([]);
        } else if (Array.isArray(data)) {
          setEstudiantes(data);
        } else {
          setError("Respuesta inesperada del servidor.");
          setEstudiantes([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar los estudiantes:", err);
        setError("Error al cargar los estudiantes.");
        setEstudiantes([]);
      });
  }, []);

  const descargarExcel = () => {
    if (estudiantes.length === 0) return;

    const datosFormateados = estudiantes.map((e) => ({
      "Nombre completo": e.nombre,
      "Correo electrónico": e.correo,
      "Teléfono": e.telefono,
      "Sede": e.sede,
      "Programa académico": e.carrera,
    }));

    const worksheet = XLSX.utils.json_to_sheet(datosFormateados);
    const columnas = Object.keys(datosFormateados[0]);
    const anchoColumnas = columnas.map((col) => ({
      wch: Math.max(
        col.length,
        ...datosFormateados.map((f) => (f[col]?.toString().length || 0))
      ) + 2,
    }));
    worksheet["!cols"] = anchoColumnas;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");

    const fecha = new Date().toISOString().split("T")[0];
    const nombreArchivo = `reporte_estudiantes_${fecha}.xlsx`;

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, nombreArchivo);
  };

  return (
    <div className="min-h-screen bg-[#427f20] flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-2xl mb-10 mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-[#1b4d2c]">Estudiantes con perfil</h3>

        {error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : estudiantes.length === 0 ? (
          <p className="text-gray-500 text-lg">No hay estudiantes registrados aún.</p>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={descargarExcel}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                📥 Descargar Excel
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {estudiantes.map((e, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <p className="text-lg mb-1">
                    <span className="font-semibold text-green-800">Nombre:</span> {e.nombre}
                  </p>
                  <p className="text-lg mb-1">
                    <span className="font-semibold text-green-800">Correo:</span> {e.correo}
                  </p>
                  <p className="text-lg mb-1">
                    <span className="font-semibold text-green-800">Teléfono:</span> {e.telefono}
                  </p>
                  <p className="text-lg mb-1">
                    <span className="font-semibold text-green-800">Sede:</span> {e.sede}
                  </p>
                  <p className="text-lg mb-1">
                    <span className="font-semibold text-green-800">Carrera:</span> {e.carrera}
                  </p>
                  {e.pdf_path && (
                    <a
                      href={e.pdf_path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                    >
                      📄 Ver hoja de vida
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Verestudiantes;






  