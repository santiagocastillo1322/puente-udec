import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginempresa.css";
import LogoUdec from "../assets/LogoUniversidad.png";

const empresasAutorizadas = [
  {
    id_empresa: 1,
    empresa: "Siscomputo",
    correo: "siscomputo@gmail.com",
    contrasena: "SiScompuTo3488",
  },
  {
    id_empresa: 2,
    empresa: "SolucionesTecnologicas",
    correo: "contacto@techsolutions.com",
    contrasena: "TechNova123",
  },
  {
    id_empresa: 3,
    empresa: "EcoFriendly SA",
    correo: "info@ecofriendly.com",
    contrasena: "thommy1322",
  },
  {
    id_empresa: 4,
    empresa: "SoftWave",
    correo: "admin@softwave.net",
    contrasena: "SoftWave456",
  },
  {
    id_empresa: 5,
    empresa: "InnovaDev",
    correo: "hr@innovadev.io",
    contrasena: "Innova!Dev2025",
  },
];

function Loginempresa() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empresa: "",
    correo: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/login_empresa.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formData.correo,
          contrasena: formData.contrasena,
          nombreEmpresa: formData.empresa,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("id_empresa", data.id_empresa);
        localStorage.setItem("correo", formData.correo);
        navigate("/apartado-empresa");
        return;
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }

    // Si el servidor falla, validar localmente con la lista de empresas autorizadas
    const empresaValida = empresasAutorizadas.find(
      (emp) =>
        emp.empresa === formData.empresa &&
        emp.correo === formData.correo &&
        emp.contrasena === formData.contrasena
    );

    if (empresaValida) {
      const empresasLogueadas =
        JSON.parse(localStorage.getItem("empresasLogueadas")) || [];
      const yaExiste = empresasLogueadas.find(
        (emp) => emp.correo === empresaValida.correo
      );

      if (!yaExiste) {
        empresasLogueadas.push(empresaValida);
        localStorage.setItem(
          "empresasLogueadas",
          JSON.stringify(empresasLogueadas)
        );
      }

      localStorage.setItem("id_empresa", empresaValida.id_empresa);
      navigate("/apartado-empresa");
    } else {
      alert("Credenciales incorrectas. Verifica los datos.");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen relative"
      style={{ backgroundColor: "#427f20" }}
    >
      <div className="absolute top-4 left-4">
        <img
          src={LogoUdec}
          alt="Logo Universidad de Cundinamarca"
          className="h-12"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-2xl flex w-[850px] overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-green-600 to-green-500 text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">¡Bienvenido!</h2>
          <p className="text-lg leading-relaxed">
            Accede con tu cuenta de empresa para gestionar oportunidades
            laborales y más.
          </p>
        </div>

        <div className="w-1/2 bg-white text-gray-800 p-10">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
            Iniciar Sesión
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full text-green-700 hover:text-green-800 mt-2 text-sm underline transition"
            >
              Volver
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginempresa;



