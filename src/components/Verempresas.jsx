import { useEffect, useState } from "react";

function Verempresas() {
  const [empresas, setEmpresas] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [empresaFiltro, setEmpresaFiltro] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const empresasGuardadas = JSON.parse(localStorage.getItem("empresasLogueadas")) || [];
    setEmpresas(empresasGuardadas);

    const cargarOfertas = async () => {
      try {
        const response = await fetch("https://puenteudec1.infinityfreeapp.com/ver_ofertas.php");
        const data = await response.json();

        if (data.success) {
          setOfertas(data.ofertas);
          setFiltradas(data.ofertas);
        } else {
          console.error("Error al obtener ofertas:", data.message || "Respuesta inválida");
        }
      } catch (error) {
        console.error("Error al cargar ofertas:", error);
      }
    };

    cargarOfertas();
  }, []);

  const filtrar = () => {
    let resultado = ofertas;

    if (empresaFiltro.trim() !== "") {
      resultado = resultado.filter((o) =>
        o.empresa.toLowerCase().includes(empresaFiltro.toLowerCase())
      );
    }

    if (estado !== "") {
      resultado = resultado.filter((o) =>
        estado === "activa"
          ? new Date(o.fecha_limite) >= new Date()
          : new Date(o.fecha_limite) < new Date()
      );
    }

    if (fechaInicio !== "") {
      resultado = resultado.filter(
        (o) => new Date(o.fecha_limite) >= new Date(fechaInicio)
      );
    }

    if (fechaFin !== "") {
      resultado = resultado.filter(
        (o) => new Date(o.fecha_limite) <= new Date(fechaFin)
      );
    }

    setFiltradas(resultado);
  };

  return (
    <div className="min-h-screen bg-[#e6f4ea] flex flex-col items-center py-12 px-4 sm:px-8">
      <h1 className="text-4xl font-extrabold text-green-800 mb-10 tracking-tight">
        📋 Lista de Empresas Logueadas
      </h1>

      {/* Tabla de empresas */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-x-auto border border-green-100 mb-12">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold tracking-wide">#</th>
              <th className="px-6 py-4 text-left font-semibold tracking-wide">Nombre Empresa</th>
              <th className="px-6 py-4 text-left font-semibold tracking-wide">Correo de Contacto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {empresas.map((empresa, index) => (
              <tr key={index} className="hover:bg-green-50 transition duration-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{empresa.empresa}</td>
                <td className="px-6 py-4 text-blue-600 underline">{empresa.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filtro de reportes */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-3xl shadow-xl space-y-6">
        <h2 className="text-2xl font-bold text-green-800">📊 Reporte de Ofertas por Empresa</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre de la empresa"
            className="border border-gray-300 rounded-lg p-2"
            value={empresaFiltro}
            onChange={(e) => setEmpresaFiltro(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg p-2"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Todas las ofertas</option>
            <option value="activa">Ofertas activas</option>
            <option value="finalizada">Ofertas finalizadas</option>
          </select>

          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <input
            type="date"
            className="border border-gray-300 rounded-lg p-2"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <button
          onClick={filtrar}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          🔍 Filtrar Ofertas
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden mt-4">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Empresa</th>
                <th className="py-3 px-4 text-left">Título</th>
                <th className="py-3 px-4 text-left">Fecha Límite</th>
                <th className="py-3 px-4 text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filtradas.length > 0 ? (
                filtradas.map((oferta, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-green-50">
                    <td className="py-2 px-4">{oferta.empresa}</td>
                    <td className="py-2 px-4">{oferta.titulo}</td>
                    <td className="py-2 px-4">{oferta.fecha_limite}</td>
                    <td className="py-2 px-4">
                      {new Date(oferta.fecha_limite) >= new Date()
                        ? "Activa"
                        : "Finalizada"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No se encontraron ofertas con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Verempresas;


