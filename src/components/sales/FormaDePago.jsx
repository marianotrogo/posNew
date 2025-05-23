import { useEffect, useState } from "react";

export default function DatosComprobante({ total = 10000,nroComprobante = "", onChange }) {
  const today = new Date().toISOString().slice(0, 10);

  const [comprobante, setComprobante] = useState({
    tipoComprobante: "Ticket X",
    fecha: today,
    nroComprobante: nroComprobante ||  "", // ← Se generará en el backend
  });

  const [totalFinal, setTotalFinal] = useState(total);

    useEffect(() => {
    setComprobante((prev) => ({ ...prev, nroComprobante })); // actualizá nro si cambia la prop
  }, [nroComprobante]);

  useEffect(() => {
    setTotalFinal(total);
    onChange && onChange({ ...comprobante, totalFinal: total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comprobante.tipoComprobante, total]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComprobante((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 space-y-4">
      <h2 className="text-sm font-medium text-gray-700">Datos del comprobante</h2>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
        {/* Tipo de comprobante */}
        <select
          name="tipoComprobante"
          value={comprobante.tipoComprobante}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="Factura A">Factura A</option>
          <option value="Factura B">Factura B</option>
          <option value="Factura C">Factura C</option>
          <option value="Ticket X">Ticket X</option>
          <option value="Nota de Crédito">Nota de Crédito</option>
        </select>

        {/* Fecha automática (no modificable) */}
        <input
          type="date"
          name="fecha"
          value={comprobante.fecha}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 bg-gray-100 cursor-not-allowed focus:outline-none"
        />

         {/* Número de comprobante */}
        <input
          type="text"
          name="nroComprobante"
          value={comprobante.nroComprobante}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 bg-gray-100 col-span-2 cursor-not-allowed"
          placeholder="Nro. de comprobante"
        />
      </div>
    </div>
  );
}
