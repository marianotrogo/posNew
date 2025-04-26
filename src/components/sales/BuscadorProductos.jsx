import BuscadorModal from "./BuscadorModal";

export default function BuscadorProductos({
  productos,
  showModal,
  setShowModal,
  searchTerm,
  setSearchTerm,
  onSeleccionarProducto,
}) {
  return (
    <div className="p-2 bg-white rounded-xl">
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
      >
        Buscar producto
      </button>

      {showModal && (
        <BuscadorModal
          productos={productos}
          onSeleccionarProducto={onSeleccionarProducto}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          onClose={() => setShowModal(false)} // ✅ Pasamos onClose correctamente
        />
      )}
    </div>
  );
}