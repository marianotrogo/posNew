import { useState } from "react";
import ProductSearch from "../components/sales/ProductSearch";
import ClientSelect from "../components/sales/ClienteSelect";
import ClientModal from "../components/sales/ClientModal";
import ProductTable from "../components/sales/ProductTable";
import PaymentMethod from "../components/sales/PaymentMethod";
import { mockProducts, mockClients } from "../utils/mockData";


const Sales = () => {
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [clientSearchEnabled, setClientSearchEnabled] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientSearch, setClientSearch] = useState("");
  const [mockClients] = useState([
    { id: 1, name: "Cliente 1", dni: "12345678" },
    { id: 2, name: "Cliente 2", dni: "87654321" },
  ]);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [cardDni, setCardDni] = useState("");
  const [cardLastDigits, setCardLastDigits] = useState("");
  const [transferDni, setTransferDni] = useState("");
  const [transferName, setTransferName] = useState("");

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectProduct = (product) => {
    // Verificamos si el producto ya está en la lista
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    
    if (existingProduct) {
      // Si el producto ya existe, le sumamos una unidad a la cantidad
      setSelectedProducts((prevState) =>
        prevState.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: p.quantity + 1, // Aumentamos la cantidad
              }
            : p
        )
      );
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      setSelectedProducts((prevState) => [
        ...prevState,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const handleDeleteProduct = (id) => {
    // Filtramos el producto con el ID especificado para eliminarlo de la lista
    setSelectedProducts((prevState) => prevState.filter((p) => p.id !== id));
  };


  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, parseInt(value) || 1); // Si el valor no es un número, lo convierte a 1
    setSelectedProducts((prevState) =>
      prevState.map((p) =>
        p.id === id ? { ...p, quantity } : p
      )
    );
  };


  return (
    <div className="container mx-auto p-6">
      <ProductSearch
        search={search}
        setSearch={setSearch}
        onSelectProduct={handleSelectProduct}
        filteredProducts={filteredProducts}
      />

      <ClientSelect
        clientSearchEnabled={clientSearchEnabled}
        setClientSearchEnabled={setClientSearchEnabled}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        showClientModal={showClientModal}
        setShowClientModal={setShowClientModal}
        mockClients={mockClients}
      />

      <ProductTable
        selectedProducts={selectedProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleQuantityChange={handleQuantityChange}
      />

      <PaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cardDni={cardDni}
        setCardDni={setCardDni}
        cardLastDigits={cardLastDigits}
        setCardLastDigits={setCardLastDigits}
        transferDni={transferDni}
        setTransferDni={setTransferDni}
        transferName={transferName}
        setTransferName={setTransferName}
      />

      {showClientModal && (
        <ClientModal
          showClientModal={showClientModal}
          setShowClientModal={setShowClientModal}
          clientSearch={clientSearch}
          setClientSearch={setClientSearch}
          filteredClients={mockClients}
          setSelectedClient={setSelectedClient}
        />
      )}
    </div>
  );
};

export default Sales




// import { useState } from "react";
// import { FaPlus, FaTrash } from "react-icons/fa";

// const mockProducts = [
//   { id: 1, code: "P001", name: "Remera Negra", size: "M", price: 5000 },
//   { id: 2, code: "P002", name: "Jean Azul", size: "40", price: 12000 },
//   { id: 3, code: "P003", name: "Campera Verde", size: "L", price: 18000 },
// ];

// const mockClients = [
//   { id: 1, name: "Juan Pérez", dni: "30111222" },
//   { id: 2, name: "Lucía Gómez", dni: "27999888" },
// ];

// const Sales = () => {
//   const [search, setSearch] = useState("");
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [showClientModal, setShowClientModal] = useState(false);
//   const [clientSearchEnabled, setClientSearchEnabled] = useState(false);
//   const [clientSearch, setClientSearch] = useState("");
//   const [selectedClient, setSelectedClient] = useState("Consumidor Final");

//   const [paymentMethod, setPaymentMethod] = useState("efectivo");
//   const [cardDni, setCardDni] = useState("");
//   const [cardLastDigits, setCardLastDigits] = useState("");
//   const [transferDni, setTransferDni] = useState("");
//   const [transferName, setTransferName] = useState("");

//   const filteredProducts = mockProducts.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredClients = mockClients.filter(
//     (c) =>
//       c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
//       c.dni.includes(clientSearch)
//   );

//   const handleSelectProduct = (product) => {
//     const exists = selectedProducts.find((p) => p.id === product.id);
//     if (!exists) {
//       setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
//     }
//     setSearch("");
//   };

//   const handleQuantityChange = (id, quantity) => {
//     setSelectedProducts((prev) =>
//       prev.map((p) =>
//         p.id === id ? { ...p, quantity: parseInt(quantity) || 1 } : p
//       )
//     );
//   };

//   const handleDeleteProduct = (id) => {
//     setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
//   };

//   const total = selectedProducts.reduce(
//     (sum, p) => sum + p.price * p.quantity,
//     0
//   );

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       {/* Fila buscador + cliente */}
//       <div className="flex flex-col md:flex-row gap-4 mb-4">
//         {/* Buscador de productos */}
//         <div className="relative w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Buscar producto..."
//             className="w-full border border-gray-300 px-4 py-2"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           {search.length > 0 && (
//             <div className="absolute bg-white border border-gray-300 w-full z-10 max-h-60 overflow-y-auto">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSelectProduct(product)}
//                   >
//                     {product.name} - Talle {product.size}
//                   </div>
//                 ))
//               ) : (
//                 <div className="p-2 text-gray-500">Sin resultados</div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Cliente */}
//         <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={clientSearchEnabled}
//               onChange={() => {
//                 setClientSearchEnabled(!clientSearchEnabled);
//                 if (!clientSearchEnabled) setSelectedClient("");
//                 else setSelectedClient("Consumidor Final");
//               }}
//             />
//             Buscar cliente
//           </label>

//           <div className="flex-1 flex items-center gap-2">
//             <select
//               disabled={!clientSearchEnabled}
//               value={selectedClient}
//               onChange={(e) => setSelectedClient(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 disabled:bg-gray-200"
//             >
//               <option>Consumidor Final</option>
//               {mockClients.map((c) => (
//                 <option key={c.id}>
//                   {c.name} - DNI {c.dni}
//                 </option>
//               ))}
//             </select>
//             <button
//               onClick={() => setShowClientModal(true)}
//               className="border border-gray-400 px-3 py-2 text-sm hover:bg-gray-200"
//               disabled={!clientSearchEnabled}
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tabla de productos */}
//       <div className="overflow-x-auto mb-6 bg-white border border-gray-300" style={{ maxHeight: "300px" }}>
//         <table className="w-full text-sm">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 text-left">Cod</th>
//               <th className="p-2 text-left">Nombre</th>
//               <th className="p-2 text-left">Talle</th>
//               <th className="p-2 text-left">Cantidad</th>
//               <th className="p-2 text-left">Precio</th>
//               <th className="p-2 text-left">Subtotal</th>
//               <th className="p-2 text-left">Eliminar</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedProducts.length > 0 ? (
//               selectedProducts.map((p) => (
//                 <tr key={p.id} className="border-t">
//                   <td className="p-2">{p.code}</td>
//                   <td className="p-2">{p.name}</td>
//                   <td className="p-2">{p.size}</td>
//                   <td className="p-2">
//                     <input
//                       type="number"
//                       min={1}
//                       value={p.quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(p.id, e.target.value)
//                       }
//                       className="w-16 border border-gray-300 px-2 py-1"
//                     />
//                   </td>
//                   <td className="p-2">${p.price}</td>
//                   <td className="p-2">${p.price * p.quantity}</td>
//                   <td className="p-2">
//                     <button
//                       className="text-red-500 hover:text-red-700"
//                       onClick={() => handleDeleteProduct(p.id)}
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="p-4 text-center text-gray-400">
//                   No hay productos agregados
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Forma de pago y total */}
//       <div className="flex flex-col gap-4 mb-4">
//         <select
//           className="border border-gray-300 px-3 py-1 text-sm w-full md:w-1/3"
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <option value="efectivo">Efectivo</option>
//           <option value="tarjeta">Tarjeta de crédito</option>
//           <option value="transferencia">Transferencia</option>
//         </select>

//         {paymentMethod === "tarjeta" && (
//           <div className="flex flex-col gap-2 text-sm max-w-sm">
//             <input
//               type="text"
//               placeholder="DNI"
//               value={cardDni}
//               onChange={(e) => setCardDni(e.target.value)}
//               className="border border-gray-300 px-3 py-1"
//             />
//             <input
//               type="text"
//               placeholder="Últimos 4 dígitos de la tarjeta"
//               maxLength={4}
//               value={cardLastDigits}
//               onChange={(e) => setCardLastDigits(e.target.value)}
//               className="border border-gray-300 px-3 py-1"
//             />
//           </div>
//         )}

//         {paymentMethod === "transferencia" && (
//           <div className="flex flex-col gap-2 text-sm max-w-sm">
//             <input
//               type="text"
//               placeholder="DNI"
//               value={transferDni}
//               onChange={(e) => setTransferDni(e.target.value)}
//               className="border border-gray-300 px-3 py-1"
//             />
//             <input
//               type="text"
//               placeholder="Nombre y apellido"
//               value={transferName}
//               onChange={(e) => setTransferName(e.target.value)}
//               className="border border-gray-300 px-3 py-1"
//             />
//           </div>
//         )}

//         <div className="flex justify-between items-center flex-wrap gap-4">
//           <div className="text-lg font-semibold">Total: ${total}</div>
//           <button className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
//             Cobrar
//           </button>
//         </div>
//       </div>

//       {/* Modal de cliente */}
//       {showClientModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
//           <div className="bg-white p-6 w-full max-w-md rounded-md">
//             <h2 className="text-xl mb-4">Buscar Cliente</h2>
//             <input
//               type="text"
//               className="w-full border border-gray-300 px-4 py-2 mb-4"
//               placeholder="Nombre o DNI"
//               value={clientSearch}
//               onChange={(e) => setClientSearch(e.target.value)}
//             />
//             <ul className="max-h-60 overflow-y-auto">
//               {filteredClients.map((client) => (
//                 <li
//                   key={client.id}
//                   className="p-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     setSelectedClient(`${client.name} - DNI ${client.dni}`);
//                     setShowClientModal(false);
//                     setClientSearch("");
//                   }}
//                 >
//                   {client.name} - DNI {client.dni}
//                 </li>
//               ))}
//             </ul>
//             <button
//               onClick={() => setShowClientModal(false)}
//               className="mt-4 px-4 py-2 border"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sales;
