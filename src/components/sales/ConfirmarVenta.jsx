import React, { useState } from "react";

export default function ModalConfirmarVenta({
  efectivo,
  setEfectivo,
  formaPago,
  setFormaPago,
  numeroTarjeta,
  setNumeroTarjeta,
  dni,
  setDni,
  totalFinal,
  onConfirmar,
  onClose,
}) {
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

    // console.log("💰 totalFinal recibido:", totalFinal);

  // Asegurarse de que efectivo y formaPago.monto sean números válidos
  const efectivoNum = Number(efectivo) || 0;
  const montoPago = Number(formaPago.monto) || 0;
  const totalPagado = efectivoNum + montoPago;
  

  const handleChangeTarjeta = (e) => {
    // Solo permite números y máximo 4 dígitos
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setNumeroTarjeta(value);
  };

  const handleFormaPago = (campo, valor) => {
    setFormaPago((prev) => ({
      ...prev,
      [campo]: campo === "monto" ? Number(valor) || "" : valor,
    }));
  };

  const validar = () => {
    if (totalPagado < (Number(totalFinal) || 0)) {
      setError("El monto total no cubre la venta.");
      return false;
    }

    if (
      ["Crédito", "Débito"].includes(formaPago.tipo) &&
      numeroTarjeta.length !== 4
    ) {
      setError("Ingresá los últimos 4 dígitos de la tarjeta.");
      return false;
    }

    if (!dni || dni.length < 7) {
      setError("El DNI debe tener al menos 7 dígitos.");
      return false;
    }

    setError("");
    return true;
  };

  const confirmarVenta = () => {
    if (!validar()) return;

    onConfirmar();
    setMensaje("✅ Venta realizada con éxito");

    // Limpiar estados
    setEfectivo("");
    setFormaPago({ tipo: "", monto: "" });
    setNumeroTarjeta("");
    setDni("");

    // Cerrar modal luego de un momento
    setTimeout(() => {
      setMensaje("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border border-gray-300 w-full max-w-md p-6 text-sm rounded shadow-lg">

        {mensaje && (
          <div className="text-green-600 font-semibold text-right mb-2">
            {mensaje}
          </div>
        )}

        <h2 className="text-base font-semibold text-center mb-4">
          Total a pagar: ${Number(totalFinal || 0).toFixed(2)}
        </h2>

        {error && (
          <div className="text-red-600 font-medium text-center mb-4">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm">Efectivo:</label>
            <input
              type="number"
              className="border border-gray-400 px-2 py-1 text-right w-1/2 focus:outline-none"
              value={efectivo}
              onChange={(e) =>
                setEfectivo(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="0"
              min="0"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm">Pago electrónico:</label>
            <input
              type="number"
              className="border border-gray-400 px-2 py-1 text-right w-1/2 focus:outline-none"
              value={formaPago.monto ?? ""}
              onChange={(e) => handleFormaPago("monto", e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-sm">Tipo de pago:</label>
            <select
              className="border border-gray-400 px-2 py-1 w-1/2 focus:outline-none bg-white"
              value={formaPago.tipo}
              onChange={(e) => handleFormaPago("tipo", e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="Crédito">Tarjeta Crédito</option>
              <option value="Débito">Tarjeta Débito</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>

          {["Crédito", "Débito"].includes(formaPago.tipo) && (
            <div className="flex justify-between items-center">
              <label className="text-sm">Últimos 4 dígitos:</label>
              <input
                type="text"
                className="border border-gray-400 px-2 py-1 text-right w-1/2 focus:outline-none"
                value={numeroTarjeta}
                onChange={handleChangeTarjeta}
                placeholder="1234"
                maxLength={4}
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <label className="text-sm">DNI:</label>
            <input
              type="text"
              className="border border-gray-400 px-2 py-1 text-right w-1/2 focus:outline-none"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
              placeholder="Documento"
              maxLength={10}
            />
          </div>
{/* 
          {cambio > 0 && (
            <div className="text-green-700 font-medium text-right mt-2">
              Cambio: ${cambio.toFixed(2)}
            </div>
          )} */}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-1 border border-gray-400 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="px-4 py-1 bg-black text-white hover:bg-neutral-800 transition-colors text-sm"
            onClick={confirmarVenta}
            disabled={!!mensaje}
            type="button"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
