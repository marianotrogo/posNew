// src/components/sales/ProductSearch.jsx
import { useState } from "react";

const ProductSearch = ({ search, setSearch, onSelectProduct, filteredProducts }) => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleProductSelect = (product) => {
    onSelectProduct(product);
    setSearch(""); // Limpiar el campo de búsqueda
    setShowSearchResults(false); // Ocultar los resultados de búsqueda
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Solo mostrar los resultados si hay algo en el campo de búsqueda
    if (value) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Buscar producto..."
        className="border px-4 py-2"
      />

      {showSearchResults && filteredProducts.length > 0 && (
        <ul className="mt-2 border bg-white shadow-lg max-h-48 overflow-y-scroll">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              onClick={() => handleProductSelect(product)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;