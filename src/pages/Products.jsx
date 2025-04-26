import { useState } from "react";
import NuevoProducto from "../components/products/NuevoProduct";
import EditarProducto from "../components/products/EditarProducto";
import EliminarProducto from "../components/products/EliminarProducto";
import ListaProductos from "../components/products/ListaProductos";

const Products = () => {
  const [seccionActiva, setSeccionActiva] = useState("nuevo");

  const renderSeccion = () => {
    switch (seccionActiva) {
      case "nuevo":
        return <NuevoProducto />;
      case "editar":
        return <EditarProducto />;
      case "eliminar":
        return <EliminarProducto />;
      case "lista":
        return <ListaProductos />;
      default:
        return <NuevoProducto />;
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 pt-6 space-y-6">

      {/* Menú fijo pequeño dentro del área de productos */}
      <div className="fixed top-0 bg-white z-10 justify-center rounded-xl shadow-sm p-2 mb-2">
        <div className="flex flex-wrap justify-center gap-2">
          {["nuevo", "editar", "eliminar", "lista"].map((seccion) => (
            <button
              key={seccion}
              onClick={() => setSeccionActiva(seccion)}
              className={`text-xs px-3 py-1 rounded-full transition ${
                seccionActiva === seccion
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {seccion === "nuevo"
                ? "Nuevo"
                : seccion === "editar"
                ? "Editar"
                : seccion === "eliminar"
                ? "Eliminar"
                : "Lista"}
            </button>
          ))}
        </div>
      </div>

      {/* Título */}
      

      {/* Contenido dinámico */}
      <div className="bg-white p-4">{renderSeccion()}</div>
    </div>
  );
};

export default Products;
