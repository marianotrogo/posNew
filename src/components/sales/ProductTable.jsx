import React from "react";

const ProductTable = ({ selectedProducts, handleDeleteProduct, handleQuantityChange }) => {
  return (
    <div className="overflow-x-auto shadow-xl rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-4 py-2 text-left">Código</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Talles</th>
            <th className="px-4 py-2 text-left">Cantidad</th>
            <th className="px-4 py-2 text-left">Precio</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-2">{product.code}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 text-sm font-medium">{product.sizes.map((size, index) => (
                <div key={index}>{size.size} ({size.quantity} disponibles)</div>
              ))}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="border p-2"
                />
              </td>
              <td className="px-4 py-2">{product.price} ARS</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;