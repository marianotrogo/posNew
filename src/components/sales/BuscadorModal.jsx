import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import axios from "../../api/axios";

const BuscarModal = ({ onClose, onSeleccionarProducto }) => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [codigoFiltro, setCodigoFiltro] = useState("");
  const [colorFiltro, setColorFiltro] = useState("");
  const [nombreFiltro, setNombreFiltro] = useState("");
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const buscarProductos = async () => {
    if (!codigoFiltro && !colorFiltro && !nombreFiltro) {
      setProductos([]);
      return;
    }

    try {
      const { data } = await axios.get("/productos");
      const filtrados = data.filter((p) =>
        (codigoFiltro ? p.codigo.includes(codigoFiltro) : true) &&
        (colorFiltro ? p.color.toLowerCase().includes(colorFiltro.toLowerCase()) : true) &&
        (nombreFiltro ? p.descripcion.toLowerCase().includes(nombreFiltro.toLowerCase()) : true)
      );
      setProductos(filtrados);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al obtener productos");
    }
  };

  const limpiarFiltros = () => {
    setCodigoFiltro("");
    setColorFiltro("");
    setNombreFiltro("");
    setProductos([]);
    setError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg w-full max-w-6xl h-[90vh] p-4 overflow-hidden"
      >
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Buscar Producto</h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Código"
            value={codigoFiltro}
            onChange={(e) => setCodigoFiltro(e.target.value)}
            className="border p-1 text-sm w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Color"
            value={colorFiltro}
            onChange={(e) => setColorFiltro(e.target.value)}
            className="border p-1 text-sm w-full sm:w-1/3"
          />
          <input
            type="text"
            placeholder="Nombre / Descripción"
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
            className="border p-1 text-sm w-full sm:w-1/3"
          />
          <button
            onClick={buscarProductos}
            className="bg-blue-600 text-white px-3 py-1 text-sm rounded"
          >
            Buscar
          </button>
          <button
            onClick={limpiarFiltros}
            className="bg-gray-300 text-black px-3 py-1 text-sm rounded"
          >
            Limpiar
          </button>
        </div>

        {/* Tabla con scroll */}
        <div className="overflow-y-auto max-h-[60vh] border rounded">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="border px-1 py-1 text-left">Código</th>
                <th className="border px-1 py-1 text-left">Descripción</th>
                <th className="border px-1 py-1 text-left">Color</th>
                <th className="border px-1 py-1 text-right">Precio</th>
                <th className="border px-1 py-1 text-left">Talle</th>
                <th className="border px-1 py-1 text-left">Stock</th>
                <th className="border px-1 py-1 text-left">Categoría</th>
                <th className="border px-1 py-1 text-left">Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-500">
                    No hay resultados.
                  </td>
                </tr>
              ) : (
                productos.flatMap((prod) =>
                  Array.isArray(prod.stock) && prod.stock.length > 0
                    ? prod.stock.map((s, i) => (
                        <tr key={`${prod._id}-${i}`}>
                          <td className="border px-1 py-1">{prod.codigo}</td>
                          <td className="border px-1 py-1">{prod.descripcion}</td>
                          <td className="border px-1 py-1">{prod.color}</td>
                          <td className="border px-1 py-1 text-right">
                            ${prod.precio}
                          </td>
                          <td className="border px-1 py-1">{s.talle}</td>
                          <td className="border px-1 py-1">{s.stock}</td>
                          <td className="border px-1 py-1">{prod.categoria}</td>
                          <td className="border px-1 py-1">
                            <button
                              onClick={() => {
                                onSeleccionarProducto(prod, s);
                                onClose();
                              }}
                              className="bg-green-600 text-white px-3 py-1 text-sm rounded"
                            >
                              Seleccionar
                            </button>
                          </td>
                        </tr>
                      ))
                    : [
                        <tr key={prod._id}>
                          <td className="border px-1 py-1">{prod.codigo}</td>
                          <td className="border px-1 py-1">{prod.descripcion}</td>
                          <td className="border px-1 py-1">{prod.color}</td>
                          <td className="border px-1 py-1 text-right">
                            ${prod.precio}
                          </td>
                          <td className="border px-1 py-1">—</td>
                          <td className="border px-1 py-1">
                            {prod.stock ?? "—"}
                          </td>
                          <td className="border px-1 py-1">{prod.categoria}</td>
                          <td className="border px-1 py-1">
                            <button
                              onClick={() => {
                                onSeleccionarProducto(prod, {});
                                onClose();
                              }}
                              className="bg-green-600 text-white px-3 py-1 text-sm rounded"
                            >
                              Seleccionar
                            </button>
                          </td>
                        </tr>,
                      ]
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuscarModal;
