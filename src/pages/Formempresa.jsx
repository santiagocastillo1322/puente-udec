import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./Form.css";

function Formempresa() {
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario Empresa enviado");
    navigate("/apartado-empresa"); // Redirige al panel de empresa
  };

  return (
    <div className="form-container">
      <h2>Información Adicional - Empresa</h2>
      <form onSubmit={handleSubmit}>
        <label>Descripción de la Empresa</label>
        <textarea placeholder="Describe de qué trata la empresa" required></textarea>

        <label>¿Qué está buscando la empresa? (mínimo 3 palabras clave)</label>
        <input type="text" placeholder="Ej: Ingenieros, Diseñadores, Freelancers" required />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Formempresa;

  
