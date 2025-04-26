import { useState } from "react";

export default function NuevoProducto() {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");
  const [talles, setTalles] = useState([{ talle: "", cantidad: "" }]);
  const [toastVisible, setToastVisible] = useState(false);

  const handleAgregarTalle = () => {
    setTalles([...talles, { talle: "", cantidad: "" }]);
  };

  const handleTalleChange = (index, campo, valor) => {
    const nuevosTalles = [...talles];
    nuevosTalles[index][campo] = valor;
    setTalles(nuevosTalles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      codigo,
      descripcion,
      color,
      precio: parseFloat(precio),
      talles: talles.filter((t) => t.talle && t.cantidad),
    };

    console.log("Producto a guardar:", nuevoProducto);

    // Mostrar toast
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);

    // Limpiar los campos
    setCodigo("");
    setDescripcion("");
    setColor("");
    setPrecio("");
    setTalles([{ talle: "", cantidad: "" }]);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-10 relative">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Nuevo producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="bg-gray-100 text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="bg-gray-100 text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="bg-gray-100 text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="bg-gray-100 text-sm p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div>
          <h3 className="text-base font-medium text-gray-700 mb-2">Talles y cantidades</h3>
          {talles.map((t, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input
                type="text"
                placeholder="Talle"
                value={t.talle}
                onChange={(e) => handleTalleChange(i, "talle", e.target.value)}
                className="bg-gray-100 text-sm p-2 rounded-lg w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={t.cantidad}
                onChange={(e) => handleTalleChange(i, "cantidad", e.target.value)}
                className="bg-gray-100 text-sm p-2 rounded-lg w-1/2 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAgregarTalle}
            className="text-sm text-black hover:underline mt-1"
          >
            + Agregar talle
          </button>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition"
          >
            Guardar producto
          </button>
        </div>
      </form>

      {toastVisible && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow-md transition">
          ✅ Producto agregado con éxito
        </div>
      )}
    </div>
  );
}
