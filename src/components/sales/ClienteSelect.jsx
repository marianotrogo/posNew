import {FaPlus} from 'react-icons/fa'


const ClientSelect = ({
    clientSearchEnabled,
    setClientSearchEnabled,
    selectedClient,
    setSelectedClient,
    showClientModal,
    setShowClientModal,
    mockClients,
  }) => {
    return (
      <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={clientSearchEnabled}
            onChange={() => {
              setClientSearchEnabled(!clientSearchEnabled);
              if (!clientSearchEnabled) setSelectedClient("");
              else setSelectedClient("Consumidor Final");
            }}
          />
          Buscar cliente
        </label>
  
        <div className="flex-1 flex items-center gap-2">
          <select
            disabled={!clientSearchEnabled}
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 disabled:bg-gray-200"
          >
            <option>Consumidor Final</option>
            {mockClients.map((c) => (
              <option key={c.id}>
                {c.name} - DNI {c.dni}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowClientModal(true)}
            className="border border-gray-400 px-3 py-2 text-sm hover:bg-gray-200"
            disabled={!clientSearchEnabled}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    );
  };
  
  export default ClientSelect;
  