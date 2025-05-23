import { useState } from "react";

import NuevoProducto from '../components/products/NuevoProduct'
import EditarProducto from "../components/products/EditarProducto";
import EliminarProducto from "../components/products/EliminarProducto";
import ConsultaProductos from "../components/products/ConsultaProductos";

const Products = () => {
  const [seccionActiva, setSeccionActiva] = useState("nuevo");

  const renderContenido = () => {
    switch (seccionActiva) {
      case "nuevo":
        return <NuevoProducto/>;
      case "editar":
        return <EditarProducto/>;
      case "eliminar":
        return <EliminarProducto/>;
      case "consulta":
        return <ConsultaProductos/>;
      default:
        return <p>Seleccione una opción</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6">
      {/* Navegación */}
      <nav className="flex gap-2 mb-4">
        {[
          { key: "nuevo", label: "Nuevo Producto" },
          { key: "editar", label: "Editar" },
          { key: "eliminar", label: "Eliminar" },
          { key: "consulta", label: "Consulta" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setSeccionActiva(item.key)}
            className={`text-sm px-3 py-1 rounded ${
              seccionActiva === item.key
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Contenido dinámico */}
      <div className="bg-white shadow p-4 rounded">
        {renderContenido()}
      </div>
    </div>
  );
};

export default Products;
