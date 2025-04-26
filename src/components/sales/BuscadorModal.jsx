import { useEffect, useRef } from "react";

export default function BuscadorModal({
  productos,
  onSeleccionarProducto,
  onClose,
  searchTerm,
  setSearchTerm,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtrados = productos.filter((p) => {
    const c = p.codigo?.toLowerCase() || "";
    const d = p.descripcion?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return c.startsWith(term) || d.startsWith(term);
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-4xl h-[80vh] relative shadow-xl flex flex-col">
        
        {/* Botón cerrar esquina */}
        <button
          onClick={()=>{
            setSearchTerm("");
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-3xl font-bold"
        >
          &times;
        </button>

        {/* Input búsqueda */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Código o descripción"
          className="w-3xl border rounded-lg p-3 mb-4 text-lg"
        />

        {/* Contenido con scroll interno */}
        <div className="flex-1 overflow-y-auto">
          {searchTerm === "" ? (
            <p className="text-center text-gray-500 py-20">
              Empieza a escribir para buscar…
            </p>
          ) : filtrados.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              No se encontraron coincidencias
            </p>
          ) : (
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">Desc.</th>
                  <th className="px-4 py-2 text-left">Cód.</th>
                  <th className="px-4 py-2 text-left">Color</th>
                  <th className="px-4 py-2 text-left">Talle</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) =>
                  p.talles.map((t) => (
                    <tr key={`${p.codigo}-${t.talle}`} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{p.descripcion}</td>
                      <td className="px-4 py-2">{p.codigo}</td>
                      <td className="px-4 py-2">{p.color}</td>
                      <td className="px-4 py-2">{t.talle}</td>
                      <td className="px-4 py-2">{t.cantidad}</td>
                      <td className="px-4 py-2">${p.precio.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <button
                          disabled={t.cantidad === 0}
                          onClick={() => {
                            onSeleccionarProducto(p, t)
                            setSearchTerm("")
                          }} 
                          className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800 transition disabled:bg-gray-300 disabled:text-gray-600"
                        >
                          {t.cantidad > 0 ? "Agregar" : "Sin stock"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Botón cerrar inferior */}
        <div className="mt-4 flex justify-end">
          {/* <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar
          </button> */}
        </div>
      </div>
    </div>
  );
}
