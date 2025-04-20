const SizeSelectModal = ({ product, onClose, onAdd }) => {
    if (!product) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
          <h2 className="text-lg font-bold mb-4">
            Seleccionar talle - {product.name}
          </h2>
  
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Talle</th>
                <th className="py-2">Disponibles</th>
                <th className="py-2">Precio</th>
                <th className="py-2 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {product.sizes.map((size) => (
                <tr key={size.size} className="border-b">
                  <td className="py-2">{size.size}</td>
                  <td className="py-2">{size.quantityAvailable}</td>
                  <td className="py-2">${product.price}</td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() =>
                        onAdd({
                          id: product.id,
                          code: product.code,
                          name: product.name,
                          size: size.size,
                          quantity: 1,
                          price: product.price,
                        })
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Agregar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  };
  
  export default SizeSelectModal;
  