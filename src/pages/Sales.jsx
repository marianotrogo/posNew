import React, { useState, useEffect } from 'react';
import ProductSearch from "../components/sales/ProductSearch";
import ProductSearchModal from "../components/sales/ProductSearchModal";
import ProductTable from "../components/sales/ProductTable";
import { mockProducts } from "../utils/mockData"; // Importar productos desde el mock

const Sales = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState(""); // Nombre del cliente
  const [saleDate, setSaleDate] = useState(""); // Fecha de la venta
  const [applyDiscount, setApplyDiscount] = useState(false); // Activar descuento
  const [discountAmount, setDiscountAmount] = useState(0); // Monto de descuento

  // Establecer la fecha automáticamente al cargar el componente
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Obtener la fecha en formato YYYY-MM-DD
    setSaleDate(today); // Establecer la fecha por defecto como la fecha actual
  }, []);

  // Agregar producto desde el buscador principal o modal
  const handleAddProduct = (product, quantity = 1) => {
    // Si ya existe el producto, solo sumamos la cantidad
    setSelectedProducts((prev) => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += quantity;
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Eliminar producto de la selección
  const handleDelete = (id) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
  };

  // Calcular total con descuento
  const calculateTotal = () => {
    const subtotal = selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    let discount = 0;
    if (applyDiscount) {
      discount = (subtotal * discountAmount) / 100; // Aplicar descuento en porcentaje
    }
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotal();

  return (
    <div className="container mx-auto p-6 space-y-4">
      {/* Formulario de venta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Nombre del cliente */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre del Cliente</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ingrese el nombre del cliente"
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        {/* Fecha de venta (texto sin formulario, tamaño reducido) */}
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Venta</label>
          <div className="border px-4 py-2 rounded bg-gray-100 text-gray-700 inline-block">
            {saleDate} {/* Mostramos la fecha como texto */}
          </div>
        </div>

        {/* Descuento */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={applyDiscount}
            onChange={(e) => setApplyDiscount(e.target.checked)}
            className="h-5 w-5"
          />
          <label className="text-sm">Aplicar descuento</label>
          {applyDiscount && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                min="0"
                max="100"
                placeholder="Descuento (%)"
                className="border px-4 py-2 rounded w-20"
              />
              <span className="text-sm">%</span> {/* Texto con el símbolo "%" */}
            </div>
          )}
        </div>
      </div>

      {/* Buscador de productos */}
      <ProductSearch
        products={mockProducts}  // Cambié a importar productos reales
        onAdd={(prod, qty) => handleAddProduct(prod, qty)}
      />

      {/* Botón para abrir el modal de búsqueda de productos */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
      >
        + Buscar productos
      </button>

      {/* Tabla de productos seleccionados */}
      <ProductTable
        selectedProducts={selectedProducts}
        onDelete={handleDelete}
      />

      {/* Modal de búsqueda de productos */}
      <ProductSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        products={mockProducts}  // Cambié a importar productos reales
        onAdd={(prod) => handleAddProduct(prod, 1)}
      />

      {/* Detalle de precios */}
      <div className="mt-6">
        <div className="flex justify-between">
          <span className="font-semibold">Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {applyDiscount && (
          <div className="flex justify-between">
            <span className="font-semibold text-red-600">Descuento ({discountAmount}%):</span>
            <span className="text-red-600">- ${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between mt-2">
          <span className="font-semibold text-lg">Total:</span>
          <span className="text-xl text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Sales;
