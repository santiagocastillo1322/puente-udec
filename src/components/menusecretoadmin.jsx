import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Menusecretoadmin = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login-administrador"); // Esta es la ruta a la que quieres ir
  };

  return (
    <div className="absolute top-5 right-5 z-50">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-transparent hover:bg-white/10 p-2 rounded-full"
      >
        <HelpCircle className="w-6 h-6 text-white" />
      </button>
      {showMenu && (
        <div className="absolute mt-2 right-0 bg-white border rounded shadow-lg p-4">
          <p className="text-sm text-gray-700 mb-2">¿Eres administrador?</p>
          <button
            onClick={handleNavigate}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
          >
            Ingresar como administrador
          </button>
        </div>
      )}
    </div>
  );
};

export default Menusecretoadmin;

