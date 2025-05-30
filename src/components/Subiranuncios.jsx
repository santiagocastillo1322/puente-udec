import React, { useState } from 'react';
import LogoUdec from "../assets/LogoUniversidad.png";
function Subiranuncios() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [esExito, setEsExito] = useState(false);  // Estado para manejar éxito/error
  const [cargando, setCargando] = useState(false);  // Estado para manejar el estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCargando(true); // Inicia el estado de carga
    setMensaje('');    // Limpia el mensaje anterior

    try {
      const res = await fetch('http://localhost/subir_anuncio.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, contenido })
      });

      // Verificar que la respuesta sea JSON antes de procesarla
      const data = await res.json();
      
      // Agregar console.log para inspeccionar la respuesta
      console.log('Respuesta del servidor:', data); 

      if (data.success) {
        setMensaje('Anuncio publicado exitosamente.');
        setEsExito(true);
        setTitulo('');
        setContenido('');
      } else {
        setMensaje(`Error: ${data.error || 'al publicar el anuncio.'}`);
        setEsExito(false);
      }

    } catch (error) {
      setMensaje('Error de conexión con el servidor.');
      setEsExito(false);
    } finally {
      setCargando(false); // Finaliza el estado de carga
    }
};


return (
  <div className="flex items-center justify-center min-h-screen w-screen relative bg-[#427f20] px-10 py-10">
    {/* Logo de la universidad */}
    <div className="absolute top-6 left-6">
      <img src={LogoUdec} alt="Logo Universidad de Cundinamarca" className="h-14" />
    </div>

    {/* Contenedor principal */}
    <div className="bg-white rounded-3xl shadow-2xl flex w-[1200px] h-[600px] overflow-hidden">
      
      {/* Columna izquierda */}
      <div className="w-1/2 bg-[#00C851] text-white p-16 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6">Subir Anuncio</h2>
        <p className="text-lg leading-relaxed">
          Publica información relevante que será visible para los usuarios. Asegúrate de que el contenido sea claro, preciso y útil.
        </p>
      </div>

      {/* Columna derecha */}
      <div className="w-1/2 bg-white p-16 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del anuncio"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none text-lg"
            required
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows="5"
            placeholder="Contenido del anuncio"
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none resize-none text-lg"
            required
          />
          {mensaje && (
            <p className={`text-center text-sm font-medium ${esExito ? 'text-green-600' : 'text-red-600'}`}>
              {mensaje}
            </p>
          )}
          <button
            type="submit"
            disabled={cargando}
            className="bg-[#0A0F1C] hover:bg-green-600 transition-all text-green-400 font-semibold py-4 px-6 rounded-lg shadow-lg w-full text-lg"
          >
            {cargando ? 'Publicando...' : 'Publicar Anuncio'}
          </button>
        </form>
      </div>
    </div>
  </div>
);


}

export default Subiranuncios;


