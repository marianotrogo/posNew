const DeleteModal = ({ producto, onClose, onConfirm }) => {
    if (!producto) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-4 rounded shadow-lg text-sm max-w-sm w-full">
                <p className="mb-4">
                    ¿Estás seguro de que querés eliminar el producto <strong>{producto.descripcion}</strong>?
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
