import { useState } from "react";
import LogoUdec from "../assets/LogoUniversidad.png";

export default function CrearVacante() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    empresa: "",
    ubicacion: "",
    tipoContrato: "",
    salario: "",
    fechaLimite: "",
    requisitos: "",
    correo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const id_empresa = parseInt(localStorage.getItem("id_empresa"));

  if (!id_empresa) {
    alert("Error: No se encontró el ID de la empresa. Inicie sesión nuevamente.");
    return;
  }

  const datosConEmpresa = {
    ...formData,
    id_empresa,
  };

  // 👇 AÑADIDO: Mostrar en consola el id_empresa antes del fetch
  console.log("id_empresa enviado:", id_empresa);

  try {
    const response = await fetch("https://puenteudec1.infinityfreeapp.com/guardar_oferta.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosConEmpresa),
    });

    const text = await response.text();
    const result = JSON.parse(text);

    if (result.success) {
      alert("✅ Vacante guardada con éxito");
      setMostrarFormulario(false);
      setFormData({
        titulo: "",
        descripcion: "",
        empresa: "",
        ubicacion: "",
        tipoContrato: "",
        salario: "",
        fechaLimite: "",
        requisitos: "",
        correo: "",
      });
    } else {
      console.error("Detalles del error SQL:", result.error); // 👈 Ya estaba correcto
      alert("❌ Error al guardar la vacante: " + (result.message || "Error desconocido"));
    }

  } catch (err) {
    console.error("Respuesta inválida del servidor:", err);
    alert("❌ Error inesperado al procesar la respuesta del servidor.");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen w-screen relative bg-[#427f20] px-10 py-10">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-14" />
      </div>

      <div className="bg-white rounded-3xl shadow-2xl flex w-[1200px] h-[700px] overflow-hidden">
        {/* Sección Izquierda */}
        <div className="w-1/2 bg-[#00C851] text-white p-16 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Crear Vacante</h2>
          <p className="text-lg leading-relaxed">
            Completa el formulario para publicar una nueva oportunidad laboral.
            Asegúrate de llenar todos los campos correctamente para atraer a los mejores candidatos.
          </p>
        </div>

        {/* Sección Derecha */}
        <div className="w-1/2 bg-white p-10 overflow-y-auto">
          {!mostrarFormulario ? (
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-green-500 hover:bg-green-600 transition-all py-4 px-8 rounded-xl text-lg font-semibold text-white shadow-lg"
            >
              Crear Vacante
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="titulo" placeholder="Título del cargo" value={formData.titulo} onChange={handleChange} className="input" />
              <textarea name="descripcion" placeholder="Descripción del cargo" value={formData.descripcion} onChange={handleChange} rows="3" className="input" />
              <input type="text" name="empresa" placeholder="Nombre de la empresa" value={formData.empresa} onChange={handleChange} className="input" />
              <input type="text" name="ubicacion" placeholder="Ubicación" value={formData.ubicacion} onChange={handleChange} className="input" />
              <input type="text" name="tipoContrato" placeholder="Tipo de contrato (ej: Término fijo)" value={formData.tipoContrato} onChange={handleChange} className="input" />
              <input type="text" name="salario" placeholder="Salario" value={formData.salario} onChange={handleChange} className="input" />
              <input type="date" name="fechaLimite" value={formData.fechaLimite} onChange={handleChange} className="input" />
              <textarea name="requisitos" placeholder="Requisitos del cargo" value={formData.requisitos} onChange={handleChange} rows="2" className="input" />
              <input type="email" name="correo" placeholder="Correo de contacto" value={formData.correo} onChange={handleChange} className="input" />
              <button type="submit" className="bg-[#0A0F1C] hover:bg-green-600 transition-all text-green-400 font-semibold py-4 px-6 rounded-lg shadow-lg w-full text-lg">
                Guardar Vacante
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}





