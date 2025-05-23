import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [talles, setTalles] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductoYCategorias = async () => {
      try {
        const [resProducto, resCategorias] = await Promise.all([
          axios.get(`/productos/${id}`),
          axios.get("/categorias"),
        ]);

        const prod = resProducto.data;

        setProducto({
          codigo: prod.codigo || "",
          descripcion: prod.descripcion || "",
          precio: prod.precio || 0,
          color: prod.color || "",
          categoriaId: prod.categoriaId?._id || "",
        });

        const stockFormateado = prod.stock.map((item) => ({
          talle: item.talle,
          stock: item.stock || 0,
        }));

        setTalles(stockFormateado);
        setCategorias(resCategorias.data);
      } catch (err) {
        console.error("Error al obtener datos", err);
        setError("Error al obtener datos del producto o categorías");
      }
    };

    fetchProductoYCategorias();
  }, [id]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleTalleChange = (index, field, value) => {
    const nuevosTalles = [...talles];
    nuevosTalles[index][field] = field === "stock" ? Number(value) : value;
    setTalles(nuevosTalles);
  };

  const eliminarTalle = (index) => {
    const nuevosTalles = [...talles];
    nuevosTalles.splice(index, 1);
    setTalles(nuevosTalles);
  };

  const agregarTalle = () => {
    setTalles([...talles, { talle: "", stock: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tallesFiltrados = talles.filter((t) => t.talle.trim() !== "");

    try {
      //actualiza el producto en el bakcend
      await axios.put(`/productos/${id}`, {
        ...producto,
        stock: tallesFiltrados,
      });

      //Redirige a la pagina de consulta sin perder el estilo
      navigate("/products/consulta", {replace: true});
    } catch (err) {
      console.error("Error al actualizar producto", err);
      setMensaje("Hubo un error al actualizar el producto");
    }
  };

  if (error) return <p className="text-red-600">{error}</p>;
  if (!producto) return <p className="text-gray-600 text-sm">Cargando producto...</p>;

  return (
    <div className="space-y-4 text-sm">
      <h2 className="font-semibold text-base">Editar Producto</h2>

      {mensaje && <p className="text-red-600">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="codigo"
            value={producto.codigo}
            onChange={handleChange}
            placeholder="Código"
            className="border p-1"
          />
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="border p-1"
          />
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
            placeholder="Precio"
            className="border p-1"
          />
          <input
            type="text"
            name="color"
            value={producto.color}
            onChange={handleChange}
            placeholder="Color"
            className="border p-1"
          />
          <select
            name="categoriaId"
            value={producto.categoriaId}
            onChange={handleChange}
            className="border p-1"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Talles y stock */}
        <div className="space-y-2">
          <p className="font-medium">Talles y Stock</p>
          {talles.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={item.talle}
                onChange={(e) => handleTalleChange(index, "talle", e.target.value)}
                placeholder="Talle"
                className="border p-1 w-24"
              />
              <input
                type="number"
                value={item.stock}
                onChange={(e) => handleTalleChange(index, "stock", e.target.value)}
                placeholder="Stock"
                className="border p-1 w-20"
              />
              <button
                type="button"
                onClick={() => eliminarTalle(index)}
                className="text-red-500 hover:underline text-xs"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={agregarTalle}
            className="text-blue-600 hover:underline text-xs"
          >
            + Agregar talle
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
