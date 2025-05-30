import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Veranuncios = ({ isModal = false, onClose, onVerAnunciosClick }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [error, setError] = useState(null);
  const [anuncioReciente, setAnuncioReciente] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarAnuncios = async () => {
    try {
      const response = await fetch("http://localhost/obtener_anuncio.php");
      const textData = await response.text();
      const jsonData = JSON.parse(textData);

      if (jsonData.success && Array.isArray(jsonData.anuncios) && jsonData.anuncios.length > 0) {
        setAnuncios(jsonData.anuncios);
        setAnuncioReciente(jsonData.anuncios[0]);
      } else {
        setError("No hay anuncios disponibles.");
        setAnuncios([]);
      }
    } catch (err) {
      console.error("Error al conectar o procesar datos:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  useEffect(() => {
    cargarAnuncios();
    if (isModal) {
      setMostrarModal(true);
    }
  }, [isModal]);

  const handleCloseModal = () => {
    setMostrarModal(false);
    if (onClose) onClose();
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* MODAL DE ANUNCIO RECIENTE */}
      <AnimatePresence>
        {mostrarModal && anuncioReciente && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full relative"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-2">{anuncioReciente.titulo}</h2>
              <p className="text-lg text-gray-700 mb-4">{anuncioReciente.contenido}</p>
              <p className="text-sm text-gray-500">
                Publicado el: {new Date(anuncioReciente.fecha_publicacion).toLocaleString()}
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                {onVerAnunciosClick && (
                  <button
                    className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded"
                    onClick={() => {
                      handleCloseModal();
                      onVerAnunciosClick();
                    }}
                  >
                    Ver Anuncios
                  </button>
                )}
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERRORES */}
      {error && <p className="text-red-600">{error}</p>}

      {/* LISTA COMPLETA DE ANUNCIOS */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios.map((anuncio, i) => (
          <div key={i} className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold text-green-800">{anuncio.titulo}</h3>
            <p className="text-gray-700 mb-2">{anuncio.contenido}</p>
            <p className="text-sm text-gray-500">
              Publicado el: {new Date(anuncio.fecha_publicacion).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Veranuncios;






