import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductos } from "../../context/ProductoContext";
import toast from "react-hot-toast";

export default function EditarProducto() {
  const { codigo } = useParams();
  const { productos, actualizarProducto } = useProductos();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    try {
      const codigoBuscado = codigo.trim().toLowerCase();
      const encontrado = productos.find(
        (p) => p.codigo.toLowerCase() === codigoBuscado
      );
  
      if (encontrado) {
        setProducto({ ...encontrado });
      } else {
        toast.error("Producto no encontrado");
      }
    } catch (err) {
      console.error("Error al cargar producto:", err);
      toast.error("Hubo un problema al cargar el producto");
    }
  }, [codigo, productos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarProducto(producto);
    toast.success("Producto actualizado");
  };

  if (!producto) return <p className="p-4">Cargando producto...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Código</label>
          <input
            type="text"
            name="codigo"
            value={producto.codigo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            disabled
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Color</label>
          <input
            type="text"
            name="color"
            value={producto.color}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
