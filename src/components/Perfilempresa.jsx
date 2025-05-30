import React, { useEffect, useState } from "react";

function PerfilEmpresa() {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    numero_empleados: "",
    numero_contacto: "",
    direccion: "",
    logo: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const id_empresa = localStorage.getItem("id_empresa");
    if (!id_empresa) {
      alert("ID de empresa no encontrado");
      return;
    }

    const obtenerPerfil = async () => {
      try {
        const res = await fetch("http://localhost/obtener_perfil_empresa.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_empresa }),
        });

        const data = await res.json();

        if (data.success && data.perfil) {
          setFormData(data.perfil);
          setHasData(true);
          setIsEditing(false);
        } else {
          setIsEditing(true); // Permitir crear perfil si no hay datos
        }
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        alert("Error al obtener perfil de empresa.");
      }
    };

    obtenerPerfil();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    const formDataImg = new FormData();
    formDataImg.append("logo", file);

    const res = await fetch("http://localhost/subir_logo.php", {
      method: "POST",
      body: formDataImg,
    });

    const result = await res.json();
    if (result.success) {
      setFormData((prev) => ({ ...prev, logo: result.logo }));
      alert("Logo subido con éxito");
    } else {
      alert("Error al subir logo: " + result.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id_empresa = localStorage.getItem("id_empresa");
    if (!id_empresa) {
      alert("ID de empresa no encontrado");
      return;
    }

    const dataToSend = { ...formData, id_empresa };

    try {
      const res = await fetch("http://localhost/guardar_empresa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const text = await res.text();
      console.log("Respuesta cruda:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        alert("Error al parsear JSON: " + err.message);
        return;
      }

      if (result.success) {
        alert("Perfil guardado correctamente");
        setIsEditing(false);
        setHasData(true);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Error en la conexión: " + err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-[90%] max-w-5xl mx-auto my-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-green-500 text-white lg:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">Perfil de Empresa</h2>
        <p className="text-base">
          Información de tu empresa. Puedes modificarla en cualquier momento.
        </p>
        {formData.logo && (
          <img
            src={`http://localhost/${formData.logo}`}
            alt="Logo empresa"
            className="mt-6 max-w-[150px] rounded-lg"
          />
        )}
      </div>

      <div className="bg-gray-100 lg:w-1/2 p-8">
        {!isEditing ? (
          <div className="space-y-3">
            <p><strong>Nombre:</strong> {formData.nombre}</p>
            <p><strong>Ubicación:</strong> {formData.ubicacion}</p>
            <p><strong>Empleados:</strong> {formData.numero_empleados}</p>
            <p><strong>Contacto:</strong> {formData.numero_contacto}</p>
            <p><strong>Dirección:</strong> {formData.direccion}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600"
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la empresa"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="ubicacion"
              placeholder="Ubicación"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="numero_empleados"
              placeholder="Número de empleados"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={formData.numero_empleados}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="numero_contacto"
              placeholder="Número de contacto"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={formData.numero_contacto}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              className="px-4 py-2 border border-gray-300 rounded-md"
              value={formData.direccion}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-gray-600 font-semibold mt-2">
              Subir logo:
              <input
                type="file"
                accept="image/*"
                className="block mt-2"
                onChange={handleLogoUpload}
              />
            </label>
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700"
            >
              Guardar Perfil
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PerfilEmpresa;




