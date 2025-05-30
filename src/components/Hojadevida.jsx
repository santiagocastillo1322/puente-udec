import { useState, useRef, useCallback } from "react";
import html2pdf from "html2pdf.js";
import LogoUdec from "../assets/LogoUniversidad.png";

function Hojadevida() {
  const [formData, setFormData] = useState({
    foto: null,
    celular: "",
    correo: "",
    perfil: "",
    habilidades: [],
    conocimientos: [],
    idiomas: "",
    academico: [],
    experiencia: [],
    trabajandoActualmente: false,
    experienciaActual: { cargo: "", empresa: "", fecha: "" },
  });

  const [previewFoto, setPreviewFoto] = useState(null);
  const formRef = useRef();
  const pdfRef = useRef();

  const habilidadesDisponibles = [
    "Comunicación", "Trabajo en equipo", "Liderazgo", "Resolución de problemas", "Creatividad",
    "Adaptabilidad", "Pensamiento crítico", "Proactividad", "Organización", "Toma de decisiones"
  ];

  const conocimientosDisponibles = [
    "Comunicación efectiva", "Trabajo en equipo", "Liderazgo", "Resolución de problemas",
    "Creatividad", "Gestión del tiempo", "Adaptabilidad", "Pensamiento crítico",
    "Atención al detalle", "Idiomas"
  ];

  const toggleSeleccion = useCallback((campo, valor) => {
    setFormData(prev => {
      const seleccionado = prev[campo].includes(valor);
      const nuevosValores = seleccionado
        ? prev[campo].filter(item => item !== valor)
        : prev[campo].length < 10
          ? [...prev[campo], valor]
          : prev[campo];
      return { ...prev, [campo]: nuevosValores };
    });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          setPreviewFoto(base64);
          setFormData(prev => ({ ...prev, [name]: base64 }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewFoto(null);
        setFormData(prev => ({ ...prev, [name]: null }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const agregarAcademico = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      academico: [...prev.academico, { titulo: "", institucion: "", fecha: "", descripcion: "" }]
    }));
  }, []);

  const agregarExperiencia = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      experiencia: [...prev.experiencia, { cargo: "", empresa: "", fecha: "", descripcion: "" }]
    }));
  }, []);

  const actualizarCampoArray = useCallback((campoArray, index, nombreCampo, valor) => {
    setFormData(prev => {
      const copiaArray = [...prev[campoArray]];
      copiaArray[index][nombreCampo] = valor;
      return { ...prev, [campoArray]: copiaArray };
    });
  }, []);

  const eliminarEntrada = useCallback((campoArray, index) => {
    setFormData(prev => {
      const copiaArray = [...prev[campoArray]];
      copiaArray.splice(index, 1);
      return { ...prev, [campoArray]: copiaArray };
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Información guardada correctamente.");
    console.log("Datos de la Hoja de Vida:", formData);
  };

  const replaceUnsupportedColors = (element) => {
    const elements = element.querySelectorAll("*");
    elements.forEach((el) => {
      const style = getComputedStyle(el);
      ["color", "backgroundColor", "borderColor"].forEach(prop => {
        if (style[prop]?.includes("oklch")) {
          el.style[prop] = "#000";
        }
      });
    });
  };

  const handleDownloadPDF = () => {
    const element = pdfRef.current;
    if (!element) return;

    element.style.display = "block";
    replaceUnsupportedColors(element);

    const opt = {
      margin: 10,
      filename: "Hojadevida.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      element.style.display = "none";
    });
  };

  return (
    <div className="flex items-start justify-center min-h-screen w-screen relative pt-8" style={{ backgroundColor: "#427f20" }}>
      <div className="absolute top-4 left-4">
        <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-12" />
      </div>

      <div ref={formRef} className="bg-white p-8 rounded-lg w-full max-w-4xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">Hoja de Vida</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FOTO */}
          <div>
            <label className="block font-semibold mb-1">Foto</label>
            <input type="file" name="foto" accept="image/*" onChange={handleChange} />
            {previewFoto && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Vista previa:</h3>
                <img src={previewFoto} alt="Vista previa" className="w-40 h-40 object-cover rounded-xl border" />
              </div>
            )}
          </div>

          {/* DATOS BÁSICOS */}
          {["celular", "correo", "perfil", "idiomas"].map((campo) => (
            <div key={campo}>
              <label className="block font-semibold mb-1">
                {campo.charAt(0).toUpperCase() + campo.slice(1)}
              </label>
              {campo === "perfil" ? (
                <textarea name={campo} onChange={handleChange} className="w-full p-2 rounded border" required />
              ) : (
                <input
                  type={campo === "correo" ? "email" : "text"}
                  name={campo}
                  onChange={handleChange}
                  className="w-full p-2 rounded border"
                  required
                />
              )}
            </div>
          ))}

          {/* HABILIDADES Y CONOCIMIENTOS */}
          {[
            { label: "Habilidades (máximo 10)", campo: "habilidades", lista: habilidadesDisponibles },
            { label: "Conocimientos Generales (máximo 10)", campo: "conocimientos", lista: conocimientosDisponibles }
          ].map(({ label, campo, lista }) => (
            <div key={campo}>
              <h2 className="text-xl font-bold mb-4">{label}</h2>
              <div className="grid grid-cols-2 gap-3">
                {lista.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSeleccion(campo, item)}
                    className={`py-2 px-4 rounded-xl transition ${
                      formData[campo].includes(item) ? "bg-green-500 text-white" : "bg-gray-800 text-green-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold">Seleccionados:</h3>
                <ul className="list-disc list-inside text-green-500">
                  {formData[campo].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}

          {/* FORMACIÓN ACADÉMICA */}
          <div>
            <h2 className="text-xl font-bold mb-2">Formación Académica</h2>
            <p className="mb-4 text-gray-700 italic">Estudios realizados que acreditan tu preparación profesional.</p>
            {formData.academico.map((item, idx) => (
              <div key={idx} className="border p-4 mb-4 rounded relative">
                <button type="button" onClick={() => eliminarEntrada("academico", idx)} className="absolute top-2 right-2 text-red-600 font-bold">
                  X
                </button>
                {["titulo", "institucion", "fecha", "descripcion"].map(campo => (
                  <input
                    key={campo}
                    type="text"
                    placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                    value={item[campo]}
                    onChange={(e) => actualizarCampoArray("academico", idx, campo, e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                ))}
              </div>
            ))}
            <button type="button" onClick={agregarAcademico} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              + Agregar Formación Académica
            </button>
          </div>

          {/* EXPERIENCIA */}
          <div>
            <h2 className="text-xl font-bold mb-2">Experiencia Laboral</h2>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={formData.trabajandoActualmente}
                  onChange={() =>
                    setFormData(prev => ({
                      ...prev,
                      trabajandoActualmente: !prev.trabajandoActualmente,
                      experienciaActual: { cargo: "", empresa: "", fecha: "" }
                    }))
                  }
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="ml-2 text-gray-700">¿Está trabajando actualmente?</span>
              </label>
            </div>

            {formData.trabajandoActualmente && (
              <div className="border p-4 mb-4 rounded bg-green-50">
                {["cargo", "empresa", "fecha"].map(campo => (
                  <input
                    key={campo}
                    type="text"
                    placeholder={`Actual: ${campo}`}
                    value={formData.experienciaActual[campo]}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        experienciaActual: { ...prev.experienciaActual, [campo]: e.target.value }
                      }))
                    }
                    className="w-full p-2 mb-2 border rounded"
                  />
                ))}
              </div>
            )}

            {formData.experiencia.map((item, idx) => (
              <div key={idx} className="border p-4 mb-4 rounded relative">
                <button type="button" onClick={() => eliminarEntrada("experiencia", idx)} className="absolute top-2 right-2 text-red-600 font-bold">
                  X
                </button>
                {["cargo", "empresa", "fecha", "descripcion"].map(campo => (
                  <input
                    key={campo}
                    type="text"
                    placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                    value={item[campo]}
                    onChange={(e) => actualizarCampoArray("experiencia", idx, campo, e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                  />
                ))}
              </div>
            ))}
            <button type="button" onClick={agregarExperiencia} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              + Agregar Experiencia Laboral
            </button>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="text-center mt-6">
            <button type="submit" className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800 mr-4">
              Guardar
            </button>
            <button type="button" onClick={handleDownloadPDF} className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-800">
              Descargar PDF
            </button>
          </div>
        </form>
      </div>

      {/* Sección oculta para PDF */}
      <div ref={pdfRef} style={{ display: "none", width: "210mm", minHeight: "297mm", backgroundColor: "white", padding: "20mm" }}>
        <h1>Hoja de Vida</h1>
        {previewFoto && <img src={previewFoto} alt="Foto Hoja de Vida" style={{ width: "150px", height: "150px" }} />}
        <p><strong>Celular:</strong> {formData.celular}</p>
        <p><strong>Correo:</strong> {formData.correo}</p>
        <p><strong>Perfil Profesional:</strong> {formData.perfil}</p>

        <h2>Habilidades</h2>
        <ul>{formData.habilidades.map(h => <li key={h}>{h}</li>)}</ul>

        <h2>Conocimientos</h2>
        <ul>{formData.conocimientos.map(c => <li key={c}>{c}</li>)}</ul>

        <p><strong>Idiomas:</strong> {formData.idiomas}</p>

        <h2>Formación Académica</h2>
        {formData.academico.map((item, idx) => (
          <div key={idx}>
            <p><strong>Título:</strong> {item.titulo}</p>
            <p><strong>Institución:</strong> {item.institucion}</p>
            <p><strong>Fecha:</strong> {item.fecha}</p>
            <p><strong>Descripción:</strong> {item.descripcion}</p>
            <hr />
          </div>
        ))}

        <h2>Experiencia Laboral</h2>
        {formData.trabajandoActualmente && (
          <div>
            <p><strong>Cargo Actual:</strong> {formData.experienciaActual.cargo}</p>
            <p><strong>Empresa Actual:</strong> {formData.experienciaActual.empresa}</p>
            <p><strong>Fecha:</strong> {formData.experienciaActual.fecha}</p>
            <hr />
          </div>
        )}
        {formData.experiencia.map((item, idx) => (
          <div key={idx}>
            <p><strong>Cargo:</strong> {item.cargo}</p>
            <p><strong>Empresa:</strong> {item.empresa}</p>
            <p><strong>Fecha:</strong> {item.fecha}</p>
            <p><strong>Descripción:</strong> {item.descripcion}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hojadevida;


