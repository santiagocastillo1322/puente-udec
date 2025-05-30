import { useEffect, useState } from "react";

function Verofertas() {
  const [vacantes, setVacantes] = useState([]);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);

  useEffect(() => {
    fetch("http://localhost/obtener_ofertas.php")
      .then(res => res.json())
      .then(data => setVacantes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#427f20] flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-2xl mb-10 mx-auto">
        <h3 className="text-3xl font-bold mb-8 text-[#1b4d2c]">Ofertas Disponibles</h3>

        {vacantes.length === 0 ? (
          <p className="text-gray-600 text-lg">No hay vacantes disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacantes.map((vacante) => (
              <div
                key={vacante.id}
                onClick={() => setVacanteSeleccionada(vacante)}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-2">{vacante.titulo}</h2>
                <p className="text-lg text-gray-700">{vacante.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal solo informativo */}
      {vacanteSeleccionada && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-10 rounded-2xl w-full max-w-2xl shadow-lg relative">
      <h2 className="text-3xl font-bold text-green-800 mb-6">
        {vacanteSeleccionada.titulo}
      </h2>
      
      <p className="text-lg text-gray-700 mb-4">
        {vacanteSeleccionada.descripcion}
      </p>

      <div className="text-gray-800 space-y-2 text-lg">
        <p><strong>Empresa:</strong> {vacanteSeleccionada.empresa}</p>
        <p><strong>Ubicación:</strong> {vacanteSeleccionada.ubicacion || "No especificada"}</p>
        <p><strong>Tipo de contrato:</strong> {vacanteSeleccionada.tipoContrato || "No especificado"}</p>
        <p><strong>Salario:</strong> {vacanteSeleccionada.salario || "No especificado"}</p>
        <p><strong>Fecha límite:</strong> {vacanteSeleccionada.fechaLimite || "No especificada"}</p>
        <p><strong>Requisitos:</strong> {vacanteSeleccionada.requisitos || "No especificados"}</p>
        <p><strong>Contacto:</strong> {vacanteSeleccionada.correo || "No especificado"}</p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setVacanteSeleccionada(null)}
          className="bg-green-800 text-white py-2 px-6 rounded-lg hover:bg-green-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Verofertas;

