export default function ResumenTotal({ productosSeleccionados, formaPago }) {
    const subtotal = productosSeleccionados.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    );
  
    const { tipo, descuento = 0, recargo = 0, totalFinal } = formaPago;
  
    return (
      <div className="bg-white rounded-lg p-4 mt-4 shadow-sm border w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumen</h2>
  
        <div className="flex justify-between py-1 text-gray-700">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
  
        {tipo === "Efectivo" || tipo === "Transferencia" ? (
          <div className="flex justify-between py-1 text-gray-700">
            <span>Descuento ({descuento}%)</span>
            <span className="text-green-600">- ${((subtotal * descuento) / 100).toFixed(2)}</span>
          </div>
        ) : tipo === "Crédito" ? (
          <div className="flex justify-between py-1 text-gray-700">
            <span>Recargo ({recargo}%)</span>
            <span className="text-red-600">+ ${((subtotal * recargo) / 100).toFixed(2)}</span>
          </div>
        ) : null}
  
        <hr className="my-2" />
  
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>Total a pagar</span>
          <span>${totalFinal?.toFixed(2) || subtotal.toFixed(2)}</span>
        </div>
      </div>
    );
  }
  