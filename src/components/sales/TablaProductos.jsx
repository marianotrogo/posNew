import React from "react";

export default function TablaProductos({ productosSeleccionados, setProductosSeleccionados }) {
  const handleEliminarProducto = (index) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos.splice(index, 1);
    setProductosSeleccionados(nuevosProductos);
  };

  const handleCantidadChange = (index, nuevaCantidad) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index].cantidad = parseInt(nuevaCantidad) || 1;
    setProductosSeleccionados(nuevosProductos);
  };

  const calcularTotal = () => {
    return productosSeleccionados.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
  };

  return (
    <div className="mt-1 bg-white p-2 overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left text-sm text-gray-700">Código</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Descripción</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Color</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Talle</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Cantidad</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Precio</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700">Subtotal</th>
            <th className="px-4 py-2 text-left text-sm text-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {productosSeleccionados.length > 0 ? (
            productosSeleccionados.map((prod, index) => (
              <tr key={prod.codigo || index} className="border-b">
                <td className="px-4 py-2">{prod.codigo}</td>
                <td className="px-4 py-2">{prod.descripcion}</td>
                <td className="px-4 py-2">{prod.color}</td>
                <td className="px-4 py-2">{prod.talle}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    max={prod.talle?.cantidad}
                    value={prod.cantidad}
                    onChange={(e) => handleCantidadChange(index, e.target.value)}
                    className="w-16 text-center p-1 border rounded-md"
                  />
                </td>
                <td className="px-4 py-2">${prod.precio.toFixed(2)}</td>
                <td className="px-4 py-2">${(prod.cantidad * prod.precio).toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEliminarProducto(index)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                No hay productos seleccionados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mostrar total general */}
      {/* {productosSeleccionados.length > 0 && (
        <div className="mt-6 text-lg font-semibold text-gray-800">
          <h4>Total: ${calcularTotal().toFixed(2)}</h4>
        </div>
      )} */}
    </div>
  );
}
