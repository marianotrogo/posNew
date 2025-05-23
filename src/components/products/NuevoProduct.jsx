import { useState, useEffect } from "react";
import axios from "../../api/axios";
import ModalAgregarStock from "./ModalAgregarStock";

const NuevoProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [color, setColor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [stockList, setStockList] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("/categorias");
        if (Array.isArray(res.data)) {
          setCategorias(res.data);
        } else {
          console.error("La respuesta no es un array", res.data);
        }
      } catch (err) {
        console.error("Error al cargar categorías", err);
      }
    };
    fetchCategorias();
  }, []);

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!categoria) {
      setMensaje("Seleccioná una categoría");
      return;
    }

    try {
      await axios.post("/productos", {
        codigo,
        descripcion,
        precio: Number(precio),
        color,
        stock: stockList,
        categoriaId: categoria,
      });

      setMensaje("Producto creado exitosamente");
      setCodigo("");
      setDescripcion("");
      setPrecio("");
      setColor("");
      setCategoria("");
      setStockList([]);

      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error(error);
      setMensaje("Hubo un error al crear el producto");
    }
  };

  const handleAgregarCategoria = async () => {
    if (!nuevaCategoria.trim()) return;

    try {
      const res = await axios.post("/categorias", {
        nombre: nuevaCategoria.trim(),
      });

      const nueva = res.data.categoria;

      setCategorias([...categorias, nueva]);
      setCategoria(nueva._id);
      setNuevaCategoria("");
      setIsCategoriaModalOpen(false);
    } catch (error) {
      console.error("Error al agregar categoría", error);
    }
  };

  return (
    <form onSubmit={handleGuardar} className="space-y-4">
      <h2 className="text-lg font-semibold">Nuevo Producto</h2>

      {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}

      <input
        type="text"
        placeholder="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="border p-2 w-full"
        required
      />

      {/* Categoría con botón para agregar nueva */}
      <div className="flex items-center gap-2">
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setIsCategoriaModalOpen(true)}
          className="text-white bg-black px-2 pb-[1px] text-lg rounded"
          title="Agregar nueva categoría"
        >
          +
        </button>
      </div>

      {/* Agregar Talles y Stock */}
      <div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-3 py-1 text-sm"
        >
          Agregar Talles y Stock
        </button>

        {stockList.length > 0 && (
          <ul className="mt-2 text-sm">
            {stockList.map((item, i) => (
              <li key={i}>
                {item.talle}: {item.stock}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="bg-black text-white px-4 py-2 text-sm">
        Guardar Producto
      </button>

      {/* Modal de talles y stock */}
      <ModalAgregarStock
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGuardar={(nuevosTalles) => setStockList(nuevosTalles)}
      />

      {/* Modal para agregar nueva categoría */}
      {isCategoriaModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h3 className="text-sm font-semibold mb-2">Nueva Categoría</h3>
            <input
              type="text"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              placeholder="Nombre de categoría"
              className="border p-2 w-full mb-3 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="text-sm text-gray-600"
                onClick={() => {
                  setNuevaCategoria("");
                  setIsCategoriaModalOpen(false);
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="bg-black text-white px-3 py-1 text-sm"
                onClick={handleAgregarCategoria}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default NuevoProducto;
