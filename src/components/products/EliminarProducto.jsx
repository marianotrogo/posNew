import { useState } from "react";
import { mockProductos } from "../../utils/mockData";

export default function EliminarProducto() {
  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState(null);
  const [confirmado, setConfirmado] = useState(false);

  // Buscar el producto por código
  const buscarProducto = () => {
    const encontrado = mockProductos.find((p) => p.codigo === codigo);
    if (encontrado) {
      setProducto(encontrado);
    } else {
      alert("Producto no encontrado");
      setProducto(null);
    }
  };

  // Eliminar el producto
  const eliminar = () => {
    console.log("Producto eliminado:", producto);
    alert("Producto eliminado (ver consola).");

    // Aquí puedes agregar la lógica para eliminar el producto
    // Ejemplo: actualizando el mock o haciendo una solicitud a tu backend

    setProducto(null); // Limpiar el producto
    setCodigo(""); // Limpiar el campo de código
    setConfirmado(false); // Resetear el estado de confirmación
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Eliminar Producto</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Código del producto"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={buscarProducto}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {producto && (
        <div className="bg-red-50 border border-red-200 p-4 rounded mb-4">
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Color:</strong> {producto.color}</p>
          <p><strong>Precio:</strong> ${producto.precio.toFixed(2)}</p>
          <p><strong>Código:</strong> {producto.codigo}</p>
          <p><strong>Talles:</strong> {producto.talles.map((t) => `${t.talle} (${t.cantidad})`).join(", ")}</p>

          {!confirmado ? (
            <button
              onClick={() => setConfirmado(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded"
            >
              Confirmar Eliminación
            </button>
          ) : (
            <button
              onClick={eliminar}
              className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 mt-4 rounded"
            >
              Eliminar Definitivamente
            </button>
          )}
        </div>
      )}
    </div>
  );
}
