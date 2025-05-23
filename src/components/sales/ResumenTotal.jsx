import React, { useState, useEffect } from "react";

export default function ResumenTotal({ subtotal = 0, formaPago, setFormaPago }) {
  const [descuento, setDescuento] = useState(formaPago?.descuento ?? 0);
  const [recargo, setRecargo] = useState(formaPago?.recargo ?? 0);

  // Funciones para sanitizar los inputs
  const handleDescuentoChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setDescuento(value);
  };

  const handleRecargoChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setRecargo(value);
  };

  // Cálculo de valores aplicados
  const descuentoAplicado = (subtotal * descuento) / 100;
  const recargoAplicado = (subtotal * recargo) / 100;
  const totalFinal = parseFloat((subtotal - descuentoAplicado + recargoAplicado).toFixed(2));

  // Actualiza el estado padre con los valores actuales
  useEffect(() => {
    setFormaPago((prev) => ({
      ...prev,
      descuento,
      recargo,
      totalFinal,
      monto: totalFinal,
    }));
  }, [descuento, recargo, subtotal]);

 
  

  return (
    <div className="text-sm space-y-4 bg-gray-50 p-4 border rounded shadow-sm">
      <div className="flex justify-between">
        <span className="text-gray-700">Subtotal:</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center gap-2">
        <label className="text-gray-700">Descuento (%):</label>
        <input
          type="number"
          value={descuento}
          min="0"
          max="100"
          onChange={handleDescuentoChange}
          className="w-20 border px-2 py-1 rounded text-center"
        />
        <span className="text-gray-500">- ${descuentoAplicado.toFixed(2)}</span>
      </div>

      <div className="flex justify-between items-center gap-2">
        <label className="text-gray-700">Recargo (%):</label>
        <input
          type="number"
          value={recargo}
          min="0"
          max="100"
          onChange={handleRecargoChange}
          className="w-20 border px-2 py-1 rounded text-center"
        />
        <span className="text-gray-500">+ ${recargoAplicado.toFixed(2)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between items-center text-base font-semibold">
        <span className="text-gray-800">Total:</span>
        <span className="text-green-600">${totalFinal.toFixed(2)}</span>
      </div>
    </div>
  );
}
