import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "../../api/axios";

const ConsultaProductos = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState("");
    const [codigoFiltro, setCodigoFiltro] = useState("");
    const [colorFiltro, setColorFiltro] = useState("");
    const navigate = useNavigate();

    const buscarProductos = async () => {
        if (!codigoFiltro && !colorFiltro) {
            setProductos([]);
            return;
        }

        try {
            const { data } = await axios.get("/productos");
            const filtrados = data.filter((producto) => {
                return (
                    (codigoFiltro ? producto.codigo.includes(codigoFiltro) : true) &&
                    (colorFiltro
                        ? producto.color.toLowerCase().includes(colorFiltro.toLowerCase())
                        : true)
                );
            });
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
        setProductos([]);
        setError("");
    };

    return (
        <div className="space-y-2">
            <h2 className="text-base font-semibold">Consulta de Productos</h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-2">
                <input
                    type="text"
                    placeholder="Filtrar por código"
                    value={codigoFiltro}
                    onChange={(e) => setCodigoFiltro(e.target.value)}
                    className="border p-1 text-sm w-1/2"
                />
                <input
                    type="text"
                    placeholder="Filtrar por color"
                    value={colorFiltro}
                    onChange={(e) => setColorFiltro(e.target.value)}
                    className="border p-1 text-sm w-1/2"
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

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-xs">
                    <thead>
                        <tr className="bg-gray-100">
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
                                <td colSpan="8" className="border px-2 py-2 text-center text-gray-500">
                                    No hay resultados. Ingrese un filtro para buscar productos.
                                </td>
                            </tr>
                        ) : (
                            productos.flatMap((prod) => {
                                if (Array.isArray(prod.stock) && prod.stock.length > 0) {
                                    return prod.stock.map((s, i) => (
                                        <tr key={`${prod._id}-${i}`}>
                                            <td className="border px-1 py-1">{prod.codigo}</td>
                                            <td className="border px-1 py-1">{prod.descripcion}</td>
                                            <td className="border px-1 py-1">{prod.color}</td>
                                            <td className="border px-1 py-1 text-right">${prod.precio}</td>
                                            <td className="border px-1 py-1">{s.talle}</td>
                                            <td className="border px-1 py-1">{s.stock}</td>
                                            <td className="border px-1 py-1">{prod.categoria}</td>
                                            <td className="border px-1 py-1">
                                                <button
                                                    onClick={() => navigate(`/products/edit/${prod._id}`)}
                                                    className="text-blue-600 hover:underline text-xs"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ));
                                } else {
                                    return (
                                        <tr key={prod._id}>
                                            <td className="border px-1 py-1">{prod.codigo}</td>
                                            <td className="border px-1 py-1">{prod.descripcion}</td>
                                            <td className="border px-1 py-1">{prod.color}</td>
                                            <td className="border px-1 py-1 text-right">${prod.precio}</td>
                                            <td className="border px-1 py-1">—</td>
                                            <td className="border px-1 py-1">{prod.stock ?? '—'}</td>
                                            <td className="border px-1 py-1">{prod.categoria}</td>
                                            <td className="border px-1 py-1">
                                                <button
                                                    onClick={() => navigate(`/products/edit/${prod._id}`)}
                                                    className="text-blue-600 hover:underline text-xs"
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConsultaProductos;
