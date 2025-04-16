import React from "react";

const ProductTable = ({ selectedProducts }) => {
  // Generar una fila por cada talle del producto
  const rows = selectedProducts.flatMap(product =>
    product.sizes.map(size => ({
      id: product.id,
      code: product.code,
      name: product.name,
      color: product.color,
      size: size.size,
      quantityAvailable: size.quantityAvailable,
    }))
  );

  // Completar hasta 12 filas con vacías
  const totalRows = [...rows];
  const emptyCount = Math.max(0, 12 - totalRows.length);
  for (let i = 0; i < emptyCount; i++) {
    totalRows.push({ empty: true, id: `empty-${i}` });
  }

  return (
    <div className="overflow-x-auto shadow-xl rounded-lg">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="px-4 py-2 text-left">Código</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Color</th>
            <th className="px-4 py-2 text-left">Talle</th>
            <th className="px-4 py-2 text-left">Disponibles</th>
          </tr>
        </thead>
        <tbody>
          {totalRows.map((row, index) => (
            row.empty ? (
              <tr key={row.id} className="border-b text-gray-300">
                <td className="px-4 py-4">—</td>
                <td className="px-4 py-4">—</td>
                <td className="px-4 py-4">—</td>
                <td className="px-4 py-4">—</td>
                <td className="px-4 py-4">—</td>
              </tr>
            ) : (
              <tr key={`${row.id}-${row.size}`} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{row.code}</td>
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.color}</td>
                <td className="px-4 py-3">{row.size}</td>
                <td className="px-4 py-3">{row.quantityAvailable}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;