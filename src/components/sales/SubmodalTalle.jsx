// src/components/SubmodalTalle.jsx
import React from "react";

const SubmodalTalle = ({ isOpen, onClose, selectedProduct }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Seleccionar Talle</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* Tabla de talles */}
        <div className="p-4">
          {selectedProduct ? (
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Talle</th>
                  <th className="px-3 py-2 border">Stock</th>
                  <th className="px-3 py-2 border">Precio</th>
                  <th className="px-3 py-2 border">Acción</th>
                </tr>
              </thead>
              <tbody>
                {/* Aquí irían los talles del producto */}
                {/* Ejemplo para cuando agregues talles:
                {selectedProduct.sizes.map(size => (
                  <tr key={size.talle}>
                    <td className="px-3 py-2 border">{size.talle}</td>
                    <td className="px-3 py-2 border">{size.stock}</td>
                    <td className="px-3 py-2 border">${selectedProduct.price}</td>
                    <td className="px-3 py-2 border">
                      <button
                        onClick={() => {
                          onAdd(size);
                          onClose();
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Agregar
                      </button>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">Esperando selección de producto...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmodalTalle;
