import { useState, useEffect } from "react";
import axios from "axios";
import LogoUdec from "../assets/LogoUniversidad.png";

const Verestado = () => {
  const [estado, setEstado] = useState("");
  const [estadoPostulacion, setEstadoPostulacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [correo, setCorreo] = useState("");

  const consultarEstado = async (correoConsulta) => {
    console.log("Correo a consultar:", correoConsulta);

    if (!correoConsulta) {
      console.log("Correo no disponible");
      setMensaje("❌ Correo no disponible");
      return;
    }

    try {
      const response = await axios.post("http://localhost/consultar_estado.php", {
        correo: correoConsulta.trim(),
      });

      if (response.data.success) {
        setEstado(response.data.estado);
        setEstadoPostulacion(response.data.estado_postulacion); // ⬅ nuevo estado
        setMensaje("🔄 Estado actualizado");
      } else {
        setEstado("");
        setEstadoPostulacion("");
        setMensaje("⚠️ Estado no encontrado");
      }
    } catch (error) {
      console.error(error);
      setEstado("");
      setEstadoPostulacion("");
      setMensaje("❌ Error de conexión");
    }
  };

  useEffect(() => {
    const correoGuardado = localStorage.getItem("correo");
    setCorreo(correoGuardado);
    if (correoGuardado) {
      consultarEstado(correoGuardado);
    } else {
      setMensaje("❌ No se encontró correo guardado");
    }
  }, []);

 return (
  <div className="min-h-screen bg-[#427f20] flex items-center justify-center px-6">
    <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center">
      <div className="absolute top-4 left-4">
        <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-12" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        🙏 Mensaje de Agradecimiento
      </h1>

      <p className="text-lg text-gray-700 mb-2">
        <strong>Correo:</strong> {correo}
      </p>

      <p className="text-gray-700 text-base mb-6 leading-relaxed">
        Agradecemos sinceramente a la empresa por revisar esta postulación.<br />
        Independientemente de si el candidato es <strong>aceptado</strong> o <strong>rechazado</strong>,
        su tiempo y consideración son muy valiosos.
      </p>

      {estado && (
        <p className="text-green-700 text-xl font-semibold mb-2">
          ✅ Estado actual de postulación: <span className="font-bold">{estado}</span>
        </p>
      )}

      {estadoPostulacion && (
        <p className="text-blue-700 text-xl font-semibold mb-4">
          📝 Estado de postulación: <span className="font-bold">{estadoPostulacion}</span>
        </p>
      )}

      {mensaje && (
        <p className="text-gray-600 italic text-sm mb-4">{mensaje}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={() => consultarEstado(correo)}
          className="bg-green-800 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-xl shadow-md transition duration-300"
        >
          ✔️ Aceptar y cerrar
        </button>
      </div>
    </div>
  </div>
);

};

export default Verestado;




