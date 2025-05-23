// utils/imprimirTicket.js
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

export const imprimirTicket = async (venta, config) => {
  const doc = new jsPDF({ unit: "pt", format: [226.77, 600] });
  let y = 20;

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(config?.nombreNegocio || "Nombre Negocio", 10, y);
  y += 12;
  doc.setFont("helvetica", "normal");
  if (config?.direccion) doc.text(`Dirección: ${config.direccion}`, 10, (y += 10));
  if (config?.telefono) doc.text(`Tel: ${config.telefono}`, 10, (y += 10));
  if (config?.cuit) doc.text(`CUIT: ${config.cuit}`, 10, (y += 10));
  if (config?.iva) doc.text(`IVA: ${config.iva}`, 10, (y += 10));
  if (config?.encabezado) doc.text(config.encabezado, 10, (y += 12));

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Ticket de Venta", 10, y);
  y += 12;
  doc.setFont("helvetica", "normal");
  doc.text(`Cliente: ${venta.cliente}`, 10, (y += 10));
  doc.text(`Fecha: ${new Date(venta.fecha).toLocaleString()}`, 10, (y += 10));
  doc.text(`Forma de pago: ${venta.formaDePago}`, 10, (y += 10));
  doc.text(`Tipo factura: ${venta.tipoFactura}`, 10, (y += 12));

  autoTable(doc, {
    startY: y,
    margin: { left: 10, right: 10 },
    styles: { fontSize: 6, cellPadding: 2 },
    headStyles: { fontStyle: "bold" },
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
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(`Total: $${venta.total.toFixed(2)}`, 10, finalY + 15);

  if (config?.pie) {
    doc.setFontSize(6);
    const pieLines = doc.splitTextToSize(config.pie, 200);
    doc.text(pieLines, 10, finalY + 35);
  }

  if (config?.qrLink) {
    try {
      const qrImageData = await QRCode.toDataURL(config.qrLink);
      doc.addImage(qrImageData, "PNG", 10, finalY + 80, 80, 80);
    } catch (error) {
      console.error("Error generando el QR:", error);
    }
  }

  window.open(doc.output("bloburl"), "_blank");
};
