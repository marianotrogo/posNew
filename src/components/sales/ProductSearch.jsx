// src/components/ProductSearch.jsx
import React, { useState, useEffect } from "react";
import SubmodalTalle from "./SubmodalTalle";

const ProductSearch = ({ products, onAdd }) => {
  const [code, setCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [isSubmodalOpen, setIsSubmodalOpen] = useState(false); // Estado para abrir/cerrar submodal

  useEffect(() => {
    if (!code) return setSuggestions([]);
    const term = code.toLowerCase();
    setSuggestions(
      products.filter((p) => p.code.toLowerCase().includes(term)).slice(0, 5)
    );
  }, [code, products]);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCode(product.code); // Asignamos el código del producto seleccionado
    setIsSubmodalOpen(true); // Abrimos el submodal
    setSuggestions([]); // Limpiamos las sugerencias
  };

  const handleCloseSubmodal = () => {
    setIsSubmodalOpen(false); // Cerramos el submodal
  };

  return (
    <div>
      {/* Buscador de productos */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-2 space-y-2 sm:space-y-0">
        <div className="relative flex-1">
          <label className="block text-sm font-medium mb-1">Cód. Barras</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Cód. Barras"
            className="border w-full px-3 py-2 rounded text-sm focus:outline-none focus:ring"
            onKeyDown={(e) => e.key === "Enter" && selectedProduct && setIsSubmodalOpen(true)} // Al presionar Enter se abre el submodal
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 z-10 bg-white border w-full max-h-40 overflow-y-auto rounded mt-1 text-sm shadow">
              {suggestions.map((p) => (
                <li
                  key={p.id}
                  onClick={() => handleSelectProduct(p)} // Seleccionamos el producto
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {p.code} – {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Submodal para seleccionar talle */}
      <SubmodalTalle
        isOpen={isSubmodalOpen}
        onClose={handleCloseSubmodal}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductSearch;
