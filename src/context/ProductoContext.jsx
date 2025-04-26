import { createContext, useContext, useState } from "react";
import { mockProductos } from "../utils/mockData";

const ProductoContext = createContext();

export const useProductos = () => useContext(ProductoContext);

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState(mockProductos);

  const actualizarProducto = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.codigo === productoActualizado.codigo ? productoActualizado : prod
      )
    );
  };

  const eliminarProducto = (codigo) => {
    setProductos((prev) => prev.filter((p) => p.codigo !== codigo));
  };

  return (
    <ProductoContext.Provider
      value={{ productos, actualizarProducto, eliminarProducto }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
