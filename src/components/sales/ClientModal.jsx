// src/components/sales/ClientModal.jsx
const ClientModal = ({
    showClientModal,
    setShowClientModal,
    clientSearch,
    setClientSearch,
    filteredClients,
    setSelectedClient,
  }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white p-6 w-full max-w-md rounded-md">
          <h2 className="text-xl mb-4">Buscar Cliente</h2>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 mb-4"
            placeholder="Nombre o DNI"
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredClients.map((client) => (
              <li
                key={client.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedClient(`${client.name} - DNI ${client.dni}`);
                  setShowClientModal(false);
                  setClientSearch("");
                }}
              >
                {client.name} - DNI {client.dni}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowClientModal(false)}
            className="mt-4 px-4 py-2 border"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  
  export default ClientModal;
  