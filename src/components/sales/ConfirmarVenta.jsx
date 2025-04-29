import React, { useState, useEffect } from "react";
import { X, Printer } from "lucide-react";

export default function ModalIngresarPago({ total = 0, onClose, onSave }) {
  const [efectivo, setEfectivo] = useState("");
  const [digitalAmount, setDigitalAmount] = useState("");
  const [digitalMethod, setDigitalMethod] = useState("");
  const [cuotas, setCuotas] = useState(1);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [dni, setDni] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");
  const [vuelto, setVuelto] = useState(0);

  useEffect(() => {
    const ef = parseFloat(efectivo) || 0;
    const dig = parseFloat(digitalAmount) || 0;
    setVuelto(((ef + dig) - total).toFixed(2));
  }, [efectivo, digitalAmount, total]);

  const handleSave = () => {
    const data = {
      efectivo: parseFloat(efectivo) || 0,
      digital: {
        method: digitalMethod,
        amount: parseFloat(digitalAmount) || 0,
      },
      cuotas,
      numeroTarjeta,
      tipoTarjeta,
      dni,
      total,
      vuelto: parseFloat(vuelto),
    };
    console.log("Datos de pago:", data);
    onSave && onSave(data);
  };

  return (
    // Backdrop: cierra al hacer click fuera del modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={() => onClose()} // Llamar a onClose cuando se hace clic en el backdrop
    >
      {/* Contenedor del modal: evita que el clic burbujee al backdrop */}
      <div
        className="bg-white border border-gray-300 rounded-lg shadow-lg w-full max-w-3xl overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevenir que el clic burbujee
      >
        {/* Header */}
        <div className="bg-blue-400 px-4 py-2 flex justify-between items-center text-white">
          <h3 className="text-lg font-semibold">Ingresar Pago</h3>
          <button onClick={() => onClose()}>
            <X size={20} />
          </button>
        </div>

        {/* Total de la Venta */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <span className="text-lg font-medium">Total de la Venta:</span>
          <span className="text-xl font-bold">${total.toFixed(2)}</span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Pago Efectivo */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium">Pago EFECTIVO</label>
            <input
              type="number"
              className="border rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring focus:ring-blue-300"
              value={efectivo}
              onChange={e => setEfectivo(e.target.value)}
              placeholder="0.00"
            />
          </div>

          {/* Pago Digital */}
          <div className="flex items-center gap-4">
            <label className="w-40 text-sm font-medium">Pago Digital</label>
            <select
              className="border rounded px-2 py-1 text-sm w-40 focus:outline-none focus:ring focus:ring-blue-300"
              value={digitalMethod}
              onChange={e => setDigitalMethod(e.target.value)}
            >
              <option>Crédito</option>
              <option>Débito</option>
              <option>Transferencia</option>
              <option>Pago QR</option>
            </select>
            <input
              type="number"
              className="border rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring focus:ring-blue-300"
              value={digitalAmount}
              onChange={e => setDigitalAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>

          {/* Cuotas, Número de Tarjeta, DNI */}
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col">
              <label className="font-medium">Cuotas</label>
              <select
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={cuotas}
                onChange={e => setCuotas(Number(e.target.value))}
              >
                {Array.from({ length: 3 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Número de Tarjeta</label>
              <input
                type="text"
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={numeroTarjeta}
                onChange={e => setNumeroTarjeta(e.target.value)}
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">DNI</label>
              <input
                type="text"
                className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                value={dni}
                onChange={e => setDni(e.target.value)}
                placeholder="Número"
              />
            </div>
          </div>

          {/* Tipo de Tarjeta */}
          <div className="flex flex-col gap-2 text-sm">
            <label className="font-medium">Tipo de Tarjeta</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-1/3 focus:outline-none focus:ring focus:ring-blue-300"
              value={tipoTarjeta}
              onChange={e => setTipoTarjeta(e.target.value)}
              placeholder="Visa, Mastercard..."
            />
          </div>

          {/* Vuelto */}
          <div className="flex justify-end items-center gap-4 mt-4">
            <span className="text-sm font-medium">VUELTO:</span>
            <span className="text-lg font-semibold text-green-600">${vuelto}</span>
          </div>
        </div>

        {/* Footer: Cerrar + Guardar */}
        <div className="px-6 py-4 border-t flex justify-end gap-4 bg-gray-50">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
          >
            <Printer size={16} /> Guardar e Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
