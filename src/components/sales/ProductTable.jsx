import React from "react";
import { X } from "lucide-react";

const ProductTable = ({ selectedProducts, onDelete }) => {
  const total = selectedProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="border px-3 py-2 text-left text-xs md:text-sm">Código Barras</th>
            <th className="border px-3 py-2 text-left text-xs md:text-sm">Descripción</th>
            <th className="border px-3 py-2 text-left text-xs md:text-sm">Cant.</th>
            <th className="border px-3 py-2 text-left text-xs md:text-sm">Precio</th>
            <th className="border px-3 py-2 text-left text-xs md:text-sm">Subtotal</th>
            <th className="border px-3 py-2 text-center text-xs md:text-sm">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 text-sm">{p.code}</td>
              <td className="border px-3 py-2 text-sm">{p.name}</td>
              <td className="border px-3 py-2 text-sm">{p.quantity}</td>
              <td className="border px-3 py-2 text-sm">${p.price.toFixed(2)}</td>
              <td className="border px-3 py-2 text-sm">
                ${(p.price * p.quantity).toFixed(2)}
              </td>
              <td className="border px-3 py-2 text-center text-sm">
                <button onClick={() => onDelete(p.id)}>
                  <X size={16} className="text-red-500 hover:text-red-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2 text-right font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default ProductTable;
