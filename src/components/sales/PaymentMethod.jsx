const PaymentMethod = ({
  paymentMethod, setPaymentMethod,
  cardDni, setCardDni, cardLastDigits, setCardLastDigits,
  transferDni, setTransferDni, transferName, setTransferName
}) => {
  return (
    <div className="mt-6">
      <select
        className="border px-4 py-2"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="efectivo">Efectivo</option>
        <option value="tarjeta">Tarjeta de crédito</option>
        <option value="transferencia">Transferencia</option>
      </select>

      {paymentMethod === "tarjeta" && (
        <div>
          <label>DNI Tarjeta:</label>
          <input
            type="text"
            value={cardDni}
            onChange={(e) => setCardDni(e.target.value)}
            className="border px-4 py-2"
          />
          <label>Últimos 4 dígitos:</label>
          <input
            type="text"
            value={cardLastDigits}
            onChange={(e) => setCardLastDigits(e.target.value)}
            className="border px-4 py-2"
          />
        </div>
      )}

      {paymentMethod === "transferencia" && (
        <div>
          <label>DNI Transferencia:</label>
          <input
            type="text"
            value={transferDni}
            onChange={(e) => setTransferDni(e.target.value)}
            className="border px-4 py-2"
          />
          <label>Nombre Transferencia:</label>
          <input
            type="text"
            value={transferName}
            onChange={(e) => setTransferName(e.target.value)}
            className="border px-4 py-2"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethod