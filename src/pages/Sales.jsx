import React, { useState, useEffect } from "react";
import axios from "../api/axios.js";
import Cliente from "../components/sales/Cliente";
import FormaDePago from "../components/sales/FormaDePago";
import BuscadorProductos from "../components/sales/BuscadorProductos";
import TablaProductos from "../components/sales/TablaProductos";
import ResumenTotal from "../components/sales/ResumenTotal";
import ModalConfirmarVenta from "../components/sales/ConfirmarVenta";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import QRCode from 'qrcode'

export default function Sales() {
  // Cliente y forma de pago
  const [cliente, setCliente] = useState(null);
  const [formaPago, setFormaPago] = useState({
    tipo: "Efectivo",
    descuento: 0,
    recargo: 0,
    totalFinal: 0,
    monto: 0,
  });

  // Productos
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  // UI y modales
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Inputs y búsquedas
  const [searchTerm, setSearchTerm] = useState("");
  const [efectivo, setEfectivo] = useState(0);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [dni, setDni] = useState("");
  const [config, setConfig] = useState(null)

  // Fetch productos al cargar componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get("/productos");
        setProductos(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setMensajeError("Error al obtener productos. Intenta recargar la página.");
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("/configuracion"); // o la ruta que uses para la configuración
        setConfig(res.data);
      } catch (error) {
        console.error("Error al obtener configuración:", error);
        setMensajeError("No se pudo cargar la configuración del sistema.");
      }
    };

    fetchConfig();
  }, []);

  // Calcular subtotal
  const subtotal = productosSeleccionados.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  // Actualizar totalFinal cuando cambia subtotal, descuento o recargo
  useEffect(() => {
    const descuento = formaPago.descuento || 0;
    const recargo = formaPago.recargo || 0;

    const montoDescuento = (subtotal * descuento) / 100;
    const montoRecargo = (subtotal * recargo) / 100;

    const total = subtotal - montoDescuento + montoRecargo;

    // console.log("descuento es:", descuento);
    // console.log("recargo es:", recargo);
    // console.log("subtotal es:", subtotal);
    // console.log("monto descuento:", montoDescuento);
    // console.log("monto recargo:", montoRecargo);
    // console.log("total final:", total);

    setFormaPago((prev) => ({ ...prev, totalFinal: total >= 0 ? total : 0 }));
  }, [subtotal, formaPago.descuento, formaPago.recargo]);


  // Filtrar productos para buscador
  const productosFiltrados = productos.filter(
    (p) =>
      p.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostrar mensaje de error temporal
  const mostrarError = (msg) => {
    setMensajeError(msg);
    setTimeout(() => setMensajeError(""), 4000);
  };

  // Seleccionar producto con talle, evitando duplicados
  const handleSeleccionarProducto = (producto, talle) => {
    const yaExiste = productosSeleccionados.some(
      (x) => x.codigo === producto.codigo && x.talle === talle.talle
    );
    if (yaExiste) {
      mostrarError("Ya agregaste ese producto/talle");
      return;
    }

    setProductosSeleccionados((prev) => [
      ...prev,
      { ...producto, talle: talle.talle, cantidad: 1 },
    ]);
    setShowModal(false);
    setSearchTerm("");
  };

  // Eliminar producto de la lista
  const handleEliminarProducto = (index) => {
    setProductosSeleccionados((prev) => prev.filter((_, i) => i !== index));
  };

  // Calcular vuelto
  const totalFinal = formaPago.totalFinal ?? 0;
  const vuelto =
    efectivo + (formaPago.monto || 0) > totalFinal
      ? efectivo + (formaPago.monto || 0) - totalFinal
      : 0;

  // Abrir modal de confirmación
  const handleAbrirConfirmarVenta = () => {
    if (productosSeleccionados.length === 0) {
      mostrarError("Agrega al menos un producto para continuar");
      return;
    }

    setEfectivo(totalFinal);
    setFormaPago((prev) => ({ ...prev, monto: 0 }));
    setShowConfirmModal(true);
  };

  // Imprimir ticket con jsPDF

  const handlePrint = async (venta, config) => {
    const doc = new jsPDF({
      unit: "pt",
      format: [226.77, 600], // ancho fijo, altura ajustable
    });

    let y = 20;

    doc.setFontSize(8); // reduje de 10 a 8
    doc.setFont("helvetica", "bold");
    doc.text(config?.nombreNegocio || "Nombre Negocio", 10, y);
    y += 12;  // reduje espacio acorde al tamaño
    doc.setFont("helvetica", "normal");
    if (config?.direccion) {
      doc.text(`Dirección: ${config.direccion}`, 10, y);
      y += 10;
    }
    if (config?.telefono) {
      doc.text(`Tel: ${config.telefono}`, 10, y);
      y += 10;
    }
    if (config?.cuit) {
      doc.text(`CUIT: ${config.cuit}`, 10, y);
      y += 10;
    }
    if (config?.iva) {
      doc.text(`IVA: ${config.iva}`, 10, y);
      y += 10;
    }

    if (config?.encabezado) {
      y += 8;
      doc.text(config.encabezado, 10, y);
      y += 12;
    }

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text("Ticket de Venta", 10, y);
    y += 12;
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${venta.cliente || "Consumidor Final"}`, 10, y);
    y += 10;
    doc.text(`Fecha: ${new Date(venta.fecha).toLocaleString()}`, 10, y);
    y += 10;
    doc.text(`Forma de pago: ${venta.formaDePago}`, 10, y);
    y += 10;
    doc.text(`Tipo factura: ${venta.tipoFactura}`, 10, y);
    y += 12;

    // Tabla productos con autotable
    autoTable(doc, {
      startY: y,
      margin: { left: 10, right: 10 },
      styles: {
        fontSize: 6,
        cellPadding: 2,
        textColor: [33, 33, 33],
        lineWidth: 0,
        fillColor: null,
        fontStyle: 'normal',
      },
      headStyles: {
        textColor: [33, 33, 33],
        fontStyle: 'bold',
        fillColor: null,
        lineWidth: 0,
      },
      alternateRowStyles: {
        fillColor: null,
      },
      columns: [
        { header: "Nº", dataKey: "num" },
        { header: "Descripción", dataKey: "descripcion" },
        { header: "Color", dataKey: "color" },
        { header: "Talle", dataKey: "talle" },
        { header: "Cant", dataKey: "cantidad" },
        { header: "Precio", dataKey: "precio" },
        { header: "Subtotal", dataKey: "subtotal" },
      ],
      body: venta.productos.map((p, i) => ({
        num: i + 1,
        descripcion: p.descripcion,
        color: p.color,
        talle: p.talle,
        cantidad: p.cantidad,
        precio: `$${p.precio.toFixed(2)}`,
        subtotal: `$${p.subtotal.toFixed(2)}`,
      })),
    });

    const finalY = doc.lastAutoTable.finalY || y + 20;
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    // Descuento (alineado a la derecha, sin negrita)
    if (venta.descuento && venta.descuento > 0) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Descuento: $${venta.descuento.toFixed(2)}`, pageWidth - 10, finalY + 10, { align: 'right' });
    }

    // Total (alineado a la derecha, en negrita)
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${venta.total.toFixed(2)}`, pageWidth - 10, finalY + 25, { align: 'right' });

    if (config?.pie) {
      doc.setFontSize(6);
      doc.setFont("helvetica", "normal");
      const pieLines = doc.splitTextToSize(config.pie, 200);
      doc.text(pieLines, 10, finalY + 45);
    }

    if (config?.qrLink) {
      try {
        const qrImageData = await QRCode.toDataURL(config.qrLink);
        doc.addImage(qrImageData, 'PNG', 10, finalY + 80, 80, 80);
      } catch (error) {
        console.error("Error generando el QR:", error);
      }
    }


    window.open(doc.output("bloburl"), "_blank");
  };


  // Confirmar venta, validar y enviar a backend
  const handleConfirmarVenta = async () => {
    const totalPagado = efectivo + (formaPago.monto || 0);

    if (totalPagado < totalFinal) {
      mostrarError("La suma de los pagos no alcanza el total de la venta");
      return;
    }

    if (cliente && dni && dni.trim().length < 7) {
      mostrarError("DNI inválido");
      return;
    }

    const venta = {
      cliente: cliente && cliente !== "Consumidor Final" ? cliente : null,
      formaDePago: formaPago.tipo,
      tipoFactura: "X",
      productos: productosSeleccionados.map((prod) => ({
        codigo: prod.codigo,
        descripcion: prod.descripcion,
        color: prod.color,
        talle: prod.talle,
        cantidad: prod.cantidad,
        precio: prod.precio,
        subtotal: prod.precio * prod.cantidad,
      })),
      descuento: (subtotal * formaPago.descuento) / 100,
      total: totalFinal,
      fecha: new Date().toISOString(),
    };

    try {
      await axios.post("/tickets", venta);
      handlePrint(venta, config || {});

      setMensajeExito("✅ Venta realizada con éxito");
      setShowConfirmModal(false);

      // Resetear estados
      setCliente(null);
      setFormaPago({
        tipo: "Efectivo",
        descuento: 0,
        recargo: 0,
        totalFinal: 0,
        monto: 0,
      });
      setProductosSeleccionados([]);
      setEfectivo(0);
      setNumeroTarjeta("");
      setDni("");
      setSearchTerm("");

      setTimeout(() => setMensajeExito(""), 3000);
    } catch (err) {
      console.error("Error al guardar el ticket:", err);
      mostrarError("❌ Error al guardar la venta");
    }
  };

  return (
    <div className="h-screen p-1 flex flex-col gap-1 bg-gray-50 text-sm">
      {/* Mensajes */}
      {mensajeExito && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {mensajeExito}
        </div>
      )}
      {mensajeError && (
        <div className="fixed top-16 right-4 bg-red-600 text-white px-4 py-2 rounded shadow z-50">
          {mensajeError}
        </div>
      )}

      {/* Cliente y Forma de pago */}
      <div className="flex gap-2 mb-1">
        <div className="flex-1 bg-white p-2">
          <Cliente cliente={cliente} setCliente={setCliente} dni={dni} setDni={setDni} />
        </div>
        <div className="flex-1 bg-white p-3">
          <FormaDePago
            total={subtotal}
            onChange={(pagoActualizado) => setFormaPago(pagoActualizado)}
            formaPago={formaPago}
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

      {/* Tabla y Resumen */}
      <div className="flex flex-row h-full gap-2">
        <div className="flex-1 bg-white p-3 overflow-auto">
          <TablaProductos
            productosSeleccionados={productosSeleccionados}
            setProductosSeleccionados={setProductosSeleccionados}
            onEliminarProducto={handleEliminarProducto}
          />
        </div>
        <div className="w-1/3 max-w-sm bg-white p-3">
          <ResumenTotal
            subtotal={subtotal}
            formaPago={formaPago}
            setFormaPago={setFormaPago}
          />
        </div>
      </div>

      {/* Botón Confirmar */}
      <div className="w-full flex justify-end mt-2">
        <button
          onClick={handleAbrirConfirmarVenta}
          className="bg-gray-800 text-white px-4 py-1 text-sm hover:bg-black transition"
        >
          Confirmar Venta
        </button>
      </div>

      {/* Modal Confirmación */}
      {showConfirmModal && (
        <ModalConfirmarVenta
          efectivo={efectivo}
          setEfectivo={setEfectivo}
          formaPago={formaPago}
          setFormaPago={setFormaPago}
          numeroTarjeta={numeroTarjeta}
          setNumeroTarjeta={setNumeroTarjeta}
          dni={dni}
          setDni={setDni}
          totalFinal={totalFinal}
          vuelto={vuelto}
          onConfirmar={handleConfirmarVenta}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
