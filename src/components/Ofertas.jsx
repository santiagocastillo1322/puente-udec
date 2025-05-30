import { useEffect, useState } from "react";

function Ofertas() {
  const [vacantes, setVacantes] = useState([]);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://tusitio.infinityfreeapp.com/obtener_ofertas.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVacantes(data);
        } else {
          console.error("La respuesta del servidor no es un array:", data);
          setVacantes([]);
        }
      })
      .catch((err) => {
        console.error("Error al obtener las vacantes:", err);
        setVacantes([]);
      });
  }, []);

  const postularse = async (idVacante) => {
    const idEgresado = localStorage.getItem("idEgresado");

    if (!idEgresado || !idVacante) {
      console.error("Faltan datos");
      return;
    }

    try {
      const response = await fetch("http://localhost/postulación.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_egresado: idEgresado,
          id_vacante: idVacante,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("¡Postulación enviada con éxito!");
        setVacanteSeleccionada(null);
      } else {
        alert("Error al postularse: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  if (vacanteSeleccionada) {
    return (
      <div className="min-h-screen bg-[#427f20] flex justify-center items-center px-4 py-10">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl relative">
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            {vacanteSeleccionada.titulo}
          </h2>

          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {vacanteSeleccionada.descripcion}
          </p>

          <div className="space-y-2 text-lg text-gray-800">
            <p><span className="font-semibold">Empresa:</span> {vacanteSeleccionada.empresa}</p>
            <p><span className="font-semibold">Ubicación:</span> {vacanteSeleccionada.ubicacion}</p>
            <p><span className="font-semibold">Tipo de contrato:</span> {vacanteSeleccionada.tipoContrato || "No especificado"}</p>
            <p><span className="font-semibold">Salario:</span> {vacanteSeleccionada.salario || "No especificado"}</p>
            <p><span className="font-semibold">Fecha límite:</span> {vacanteSeleccionada.fechaLimite || "No especificada"}</p>
            <p><span className="font-semibold">Requisitos:</span> {vacanteSeleccionada.requisitos || "No especificados"}</p>
            <p><span className="font-semibold">Contacto:</span> {vacanteSeleccionada.correo || "No especificado"}</p>
          </div>

          <button
            onClick={() => postularse(vacanteSeleccionada.id)}
            className="mt-8 w-full bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-3 rounded-xl shadow transition"
          >
            Postularme
          </button>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setVacanteSeleccionada(null)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-lg font-semibold py-2 px-6 rounded-xl shadow transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-lg text-gray-700 mb-4">{vacante.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Ofertas;








