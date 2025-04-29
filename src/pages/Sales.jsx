import { useState } from "react";
import Cliente from "../components/sales/Cliente";
import FormaDePago from "../components/sales/FormaDePago";
import BuscadorProductos from "../components/sales/BuscadorProductos";
import TablaProductos from "../components/sales/TablaProductos";
import { mockProductos } from "../utils/mockData";
import ResumenTotal from "../components/sales/ResumenTotal";
import ModalConfirmarVenta from "../components/sales/ConfirmarVenta";

export default function Sales() {
  const [cliente, setCliente] = useState(null);
  const [formaPago, setFormaPago] = useState({
    tipo: "Efectivo",
    descuento: 0,
    recargo: 0,
    totalFinal: 0,
  });
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [efectivo, setEfectivo] = useState(0);
  const [otrosMedios, setOtrosMedios] = useState(0);

  // Nuevos estados para tarjeta
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [dni, setDni] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState("");

  const toggleModal = () => setShowModal((v) => !v);

  const productosFiltrados = mockProductos.filter(
    (p) =>
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeleccionarProducto = (producto, talle) => {
    if (
      productosSeleccionados.some(
        (x) => x.codigo === producto.codigo && x.talle === talle.talle
      )
    ) {
      alert("Ya agregaste ese producto/talle");
      return;
    }
    setProductosSeleccionados((prev) => [
      ...prev,
      { ...producto, talle: talle.talle, cantidad: 1 },
    ]);
    setShowModal(false);
  };

  const handleEliminarProducto = (index) => {
    setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAbrirConfirmarVenta = () => {
    // Seteamos los valores por defecto
    setEfectivo(formaPago.totalFinal);
    setOtrosMedios(0);
    setShowConfirmModal(true);
  };

  const handleConfirmarVenta = () => {
    if (efectivo + otrosMedios !== formaPago.totalFinal) {
      alert("La suma de los pagos no coincide con el total de la venta");
      return;
    }

    const venta = {
      cliente: cliente,
      formaPago: {
        efectivo: efectivo,
        otros: otrosMedios,
        numeroTarjeta,
        tipoTarjeta,
        dni,
      },
      productos: productosSeleccionados,
      subtotal: subtotal,
      fecha: new Date().toISOString(),
    };

    console.log("Venta confirmada:", venta);
    setShowConfirmModal(false);
  };

  // Total sin ajuste
  const subtotal = productosSeleccionados.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  return (
    <div className="h-screen p-3 flex flex-col gap-1 bg-gray-50">
      {/* Cliente & Forma de Pago */}
      <div className="flex gap-4 mb-1">
        <div className="flex-1 bg-white rounded-lg shadow-md p-3">
          <Cliente setCliente={setCliente} />
        </div>
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <FormaDePago
            total={subtotal}
            onChange={(pagoActualizado) => setFormaPago(pagoActualizado)}
          />
        </div>
      </div>

      {/* Buscador */}
      <BuscadorProductos
        productos={productosFiltrados}
        showModal={showModal}
        setShowModal={setShowModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSeleccionarProducto={handleSeleccionarProducto}
      />

      {/* Layout de 2 columnas */}
      <div className="flex flex-row h-full">
        <div className="flex-1 bg-white shadow-md p-6 overflow-auto">
          <TablaProductos
            productosSeleccionados={productosSeleccionados}
            setProductosSeleccionados={setProductosSeleccionados}
          />
        </div>

        <div className="w-1/3 max-w-sm bg-white shadow-lg p-6 border-gray-200">
          <ResumenTotal
            productosSeleccionados={productosSeleccionados}
            formaPago={formaPago}
          />
        </div>
      </div>

      {/* Botón Confirmar Venta */}
      <div className="w-full flex justify-end mt-4">
        <button
          onClick={handleAbrirConfirmarVenta}
          className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
        >
          Confirmar Venta
        </button>
      </div>

      {/* Modal de Confirmar Venta */}
      {showConfirmModal && (
        <ModalConfirmarVenta
          efectivo={efectivo}
          setEfectivo={setEfectivo}
          otrosMedios={otrosMedios}
          setOtrosMedios={setOtrosMedios}
          formaPago={formaPago}
          setFormaPago={setFormaPago}
          numeroTarjeta={numeroTarjeta}
          setNumeroTarjeta={setNumeroTarjeta}
          dni={dni}
          setDni={setDni}
          tipoTarjeta={tipoTarjeta}
          setTipoTarjeta={setTipoTarjeta}
          onConfirmar={handleConfirmarVenta}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
