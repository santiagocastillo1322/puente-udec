import { useState } from "react";

function PerfilEgresado() {
  const [datos, setDatos] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    sede: "Fusagasugá",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del egresado:", datos);
    alert("Información guardada correctamente");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Formulario del Egresado</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              name="correo"
              value={datos.correo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={datos.telefono}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sede</label>
            <select
              name="sede"
              value={datos.sede}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="Fusagasugá">Fusagasugá</option>
              <option value="Girardot">Girardot</option>
              <option value="Ubaté">Ubaté</option>
              <option value="Chía">Chía</option>
              <option value="Zipaquirá">Zipaquirá</option>
              <option value="Facatativá">Facatativá</option>
              <option value="Soacha">Soacha</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Información
          </button>
        </form>
      </div>
    </div>
  );
}

export default PerfilEgresado;


