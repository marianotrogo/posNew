import { useEffect, useState } from "react";
import axios from "../../api/axios";

const Configuracion = () => {
  const [config, setConfig] = useState({
    nombreNegocio: "",
    direccion: "",
    telefono: "",
    cuit: "",
    iva: "Responsable Inscripto",
    encabezado: "",
    pie: "",
    logo: "",
    qrLink: "",
  });

  const [guardado, setGuardado] = useState(false);

  useEffect(() => {
    axios.get("/configuracion").then((res) => {
      if (res.data) setConfig(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleLogo = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const maxSizeKB = 100;
  const maxSizeBytes = maxSizeKB * 1024;

  if (file.size > maxSizeBytes) {
    alert(`El archivo es muy pesado, se intentará reducir su tamaño automáticamente.`);
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const maxWidth = 300; // Redimensionar a este ancho máximo
      const scale = maxWidth / img.width;
      const width = maxWidth;
      const height = img.height * scale;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const resizedBase64 = canvas.toDataURL("image/png", 0.8); // 80% de calidad

      // Verificar peso después de redimensionar
      const sizeInBytes = Math.round(
        (resizedBase64.length * (3 / 4)) - (resizedBase64.endsWith("==") ? 2 : 1)
      );

      if (sizeInBytes > maxSizeBytes) {
        alert("El logo sigue siendo muy pesado incluso después de redimensionar (100KB máx). Usá una imagen más liviana.");
        return;
      }

      setConfig({ ...config, logo: resizedBase64 });
    };
  };

  reader.readAsDataURL(file);
};

  const handleGuardar = async () => {
  if (!config.nombreNegocio || !config.cuit) {
    alert("Por favor completá los datos obligatorios.");
    return;
  }

  if (config._id) {
    await axios.put(`/configuracion/${config._id}`, config);
  } else {
    await axios.post("/configuracion", config);
  }

  setGuardado(true);
  setTimeout(() => setGuardado(false), 2000);
};

  return (
    <div className="p-4 max-w-2xl mx-auto text-sm space-y-4">
      <h1 className="text-lg font-semibold border-b pb-2">Configuración del Negocio</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Nombre del negocio</label>
          <input
            type="text"
            name="nombreNegocio"
            value={config.nombreNegocio}
            onChange={handleChange}
            className="w-full border px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={config.telefono}
            onChange={handleChange}
            className="w-full border px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={config.direccion}
            onChange={handleChange}
            className="w-full border px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label>CUIT</label>
          <input
            type="text"
            name="cuit"
            value={config.cuit}
            onChange={handleChange}
            className="w-full border px-2 py-1 text-sm"
          />
        </div>

        <div>
          <label>Condición IVA</label>
          <select
            name="iva"
            value={config.iva}
            onChange={handleChange}
            className="w-full border px-2 py-1 text-sm"
          >
            <option>Responsable Inscripto</option>
            <option>Monotributista</option>
            <option>Exento</option>
            <option>No Responsable</option>
          </select>
        </div>

        <div>
          <label>Logo (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            className="w-full border px-2 py-1 text-sm"
          />
          {config.logo && (
            <img src={config.logo} alt="Logo" className="h-16 mt-2 object-contain" />
          )}
        </div>
      </div>

      <div>
        <label>Encabezado del comprobante</label>
        <textarea
          name="encabezado"
          value={config.encabezado}
          onChange={handleChange}
          rows={3}
          className="w-full border px-2 py-1 text-sm"
        />
      </div>

      <div>
        <label>Pie de página del comprobante</label>
        <textarea
          name="pie"
          value={config.pie}
          onChange={handleChange}
          rows={2}
          className="w-full border px-2 py-1 text-sm"
        />
      </div>
      <div>
          <label>Link para QR</label>
          <input
            type="text"
            name="qrLink"
            value={config.qrLink || ""}
            onChange={handleChange}
            className="w-full border px-2 py-1 text-sm"
          />
        </div>

      <button
        onClick={handleGuardar}
        className="bg-black text-white px-4 py-1 text-sm"
      >
        Guardar configuración
      </button>

      {guardado && (
        <p className="text-green-600 text-sm mt-2">✅ Configuración guardada correctamente</p>
      )}
    </div>
  );
};

export default Configuracion;
