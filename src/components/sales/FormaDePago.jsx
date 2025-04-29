import { useEffect, useState } from "react";

export default function FormaDePago({ total = 10000, onChange }) {
  // Calculamos la fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10);

  const [pago, setPago] = useState({
    comprobante: "Ticket X",
    tipoFactura: "Remito",
    fecha: today,    // ← Fecha automática
  });

  const [totalFinal, setTotalFinal] = useState(total);

  useEffect(() => {
    // Solo actualizamos el total final (sin descuentos/recargos)
    setTotalFinal(total);
    onChange && onChange({ ...pago, totalFinal: total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pago.comprobante, pago.tipoFactura, /* pago.fecha no afecta al total */ total]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 space-y-4">
      <h2 className="text-sm font-medium text-gray-700">Forma de pago</h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
        {/* Tipo de comprobante */}
        <select
          name="comprobante"
          value={pago.comprobante}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Factura A">Factura A</option>
          <option value="Factura B">Factura B</option>
          <option value="Factura C">Factura C</option>
          <option value="Ticket X">Ticket X</option>
          <option value="Nota de Crédito">Nota de Crédito</option>
        </select>

        {/* Tipo de factura */}
        <select
          name="tipoFactura"
          value={pago.tipoFactura}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Remito">Remito</option>
          <option value="Factura X">Factura X</option>
          <option value="Factura C">Factura C</option>
        </select>

        {/* Fecha automática (solo lectura) */}
        <input
          type="date"
          name="fecha"
          value={pago.fecha}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
        />
      </div>
    </div>
  );
}
