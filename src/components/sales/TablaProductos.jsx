import React from "react";

export default function TablaProductos({
  productosSeleccionados,
  setProductosSeleccionados,
}) {
  const handleCantidadChange = (index, nuevaCantidad) => {
    const actualizados = [...productosSeleccionados];
    actualizados[index].cantidad = parseInt(nuevaCantidad);
    setProductosSeleccionados(actualizados);
  };

  const handleEliminarProducto = (index) => {
    const actualizados = productosSeleccionados.filter((_, i) => i !== index);
    setProductosSeleccionados(actualizados);
  };

  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-left border-b">
          <th>Código</th>
          <th>Descripción</th>
          <th>Talle</th>
          <th>Cant.</th>
          <th>Precio</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {productosSeleccionados.map((prod, i) => (
          <tr key={i} className="border-b">
            <td>{prod.codigo}</td>
            <td>{prod.descripcion}</td>
            <td>{prod.talle}</td>
            <td>
              <input
                type="number"
                min="1"
                value={prod.cantidad}
                onChange={(e) => handleCantidadChange(i, e.target.value)}
                className="w-12 border px-1"
              />
            </td>
            <td>${prod.precio.toFixed(2)}</td>
            <td>${(prod.precio * prod.cantidad).toFixed(2)}</td>
            <td>
              <button
                onClick={() => handleEliminarProducto(i)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
