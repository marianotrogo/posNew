import { useState, useEffect, useRef } from "react";

const ProductSearchModal = ({ isOpen, onClose, products, onAdd }) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const modalRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    if (!term) return setResults([]);
    const t = term.toLowerCase();
    setResults(
      products
        .filter(
          (p) =>
            p.code.toLowerCase().includes(t) ||
            p.name.toLowerCase().includes(t)
        )
        .slice(0, 20)
    );
  }, [term, products]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0"
    >
      <div
        ref={modalRef}
        className="
          bg-white 
          w-full h-full 
          sm:w-full sm:max-w-3xl sm:h-auto 
          rounded-none sm:rounded-xl 
          shadow-lg 
          flex flex-col
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Buscar producto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Input */}
        <div className="p-4 border-b">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar por código o nombre..."
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200 text-sm"
            autoFocus
            onKeyDown={(e) =>
              e.key === "Enter" && results[0] && onAdd(results[0])
            }
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {results.length > 0 ? (
            results.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center px-2 py-3 rounded hover:bg-gray-100 transition"
              >
                <div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-gray-500 text-xs">{p.code}</div>
                </div>
                <button
                  onClick={() => onAdd(p)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
                >
                  Agregar
                </button>
              </div>
            ))
          ) : (
            term && (
              <p className="text-center text-gray-500 py-4 text-sm">
                Sin resultados
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchModal;
