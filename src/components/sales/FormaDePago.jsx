import { useEffect, useState } from "react";

export default function FormaDePago({ total = 10000, onChange }) {
  const [pago, setPago] = useState({
    tipo: "Efectivo",
    descuento: 0,
    recargo: 0,
    comprobante: "Ticket X", // ➡️ Nuevo campo
  });

  const [totalFinal, setTotalFinal] = useState(total);

  useEffect(() => {
    let final = total;

    if (pago.tipo === "Efectivo" || pago.tipo === "Transferencia") {
      final = total - (total * pago.descuento) / 100;
    } else if (pago.tipo === "Crédito") {
      final = total + (total * pago.recargo) / 100;
    }

    if (final !== totalFinal) {
      setTotalFinal(final);
      onChange && onChange({ ...pago, totalFinal: final });
    }
  }, [pago, total, totalFinal, onChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago((prev) => ({ ...prev, [name]: value }));
  };

  const mostrarDescuento = pago.tipo === "Efectivo" || pago.tipo === "Transferencia";
  const mostrarRecargo = pago.tipo === "Crédito";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 space-y-4">
      <h2 className="text-sm font-medium text-gray-700">Forma de pago</h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
        {/* Forma de pago */}
        <select
          name="tipo"
          value={pago.tipo}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Débito">Débito</option>
          <option value="Crédito">Crédito</option>
          <option value="Transferencia">Transferencia</option>
        </select>

        {/* Tipo de comprobante */}
        <select
          name="comprobante"
          value={pago.comprobante}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Factura A">Factura A</option>
          <option value="Factura B">Factura B</option>
          <option value="Factura C">Factura C</option>
          <option value="Ticket X">Ticket X</option>
          <option value="Nota de Crédito">Nota de Crédito</option>
        </select>

        {/* Campos dinámicos */}
        {mostrarDescuento && (
          <input
            type="number"
            name="descuento"
            placeholder="% Descuento"
            value={pago.descuento}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}

        {mostrarRecargo && (
          <input
            type="number"
            name="recargo"
            placeholder="% Recargo"
            value={pago.recargo}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        )}
      </div>
    </div>
  );
}
