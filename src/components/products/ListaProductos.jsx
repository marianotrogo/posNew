import { useState } from "react";
import { useProductos } from "../../context/ProductoContext";

export default function ListaProductos() {
  const { productos } = useProductos();
  const [filtro, setFiltro] = useState("");
  const [orden, setOrden] = useState({ campo: null, asc: true });

  const handleOrden = (campo) => {
    setOrden((prev) => ({
      campo,
      asc: prev.campo === campo ? !prev.asc : true,
    }));
  };

  const productosFiltrados = productos
    .filter((p) => {
      const texto = filtro.toLowerCase();
      return (
        p.codigo.toLowerCase().startsWith(texto) ||
        p.descripcion.toLowerCase().includes(texto) ||
        p.color.toLowerCase().includes(texto)
      );
    })
    .sort((a, b) => {
      if (!orden.campo) return 0;
      const aVal = a[orden.campo];
      const bVal = b[orden.campo];

      if (typeof aVal === "number") {
        return orden.asc ? aVal - bVal : bVal - aVal;
      }

      return orden.asc
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Lista de Productos</h2>
        <input
          type="text"
          placeholder="Buscar por código, desc o color"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 px-3 py-1 rounded text-sm w-72"
        />
      </div>

      <div className="overflow-y-auto max-h-[400px] rounded border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100 shadow text-gray-700 z-10">
            <tr>
              <th
                onClick={() => handleOrden("codigo")}
                className="border-b px-4 py-2 text-left cursor-pointer select-none"
              >
                Código {orden.campo === "codigo" ? (orden.asc ? "▲" : "▼") : ""}
              </th>
              <th className="border-b px-4 py-2 text-left">Descripción</th>
              <th className="border-b px-4 py-2 text-left">Color</th>
              <th
                onClick={() => handleOrden("precio")}
                className="border-b px-4 py-2 text-left cursor-pointer select-none"
              >
                Precio {orden.campo === "precio" ? (orden.asc ? "▲" : "▼") : ""}
              </th>
              <th className="border-b px-4 py-2 text-left">Talles</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr key={producto.codigo} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{producto.codigo}</td>
                  <td className="px-4 py-2">{producto.descripcion}</td>
                  <td className="px-4 py-2">{producto.color}</td>
                  <td className="px-4 py-2">${producto.precio.toFixed(2)}</td>
                  <td className="px-4 py-2 space-y-1">
                    {producto.talles.map((t) => (
                      <div
                        key={t.talle}
                        className="bg-gray-100 rounded px-2 py-1 inline-block text-xs"
                      >
                        {t.talle} - {t.cantidad}u
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No se encontraron productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
