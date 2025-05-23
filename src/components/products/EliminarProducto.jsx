import { useState } from "react";
import axios from "../../api/axios";

const EliminarProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const buscarProducto = async () => {
    try {
      const { data } = await axios.get("/productos");
      const encontrado = data.find((p) => p.codigo === codigo);
      if (encontrado) {
        setProducto(encontrado);
        setError("");
      } else {
        setProducto(null);
        setError("Producto no encontrado");
      }
    } catch (err) {
      console.error(err);
      setError("Error al buscar el producto");
    }
  };

  const eliminarProducto = async () => {
    if (!producto) return;

    try {
      await axios.delete(`/productos/${producto._id}`);
      setMensaje("Producto eliminado correctamente");
      setProducto(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el producto");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Código del producto"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={buscarProducto}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {error && <div className="text-red-600">{error}</div>}
      {mensaje && <div className="text-green-600">{mensaje}</div>}

      {producto && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-medium mb-2">¿Eliminar el siguiente producto?</h3>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Color:</strong> {producto.color}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>

          <button
            onClick={eliminarProducto}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Confirmar Eliminación
          </button>
        </div>
      )}
    </div>
  );
};

export default EliminarProducto;
