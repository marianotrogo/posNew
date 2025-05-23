import { useState } from "react";

export default function Cliente({ onChange }) {
  const [editable, setEditable] = useState(false);
  const [cliente, setCliente] = useState({
    nombre: "Consumidor Final",
    dni: "",
    domicilio: "",
    contacto: "",
    mail: "",
  });

  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setEditable(checked);

    if (!checked) {
      const cf = {
        nombre: "Consumidor Final",
        dni: "",
        domicilio: "",
        contacto: "",
        mail: "",
        _id: null, // esto ayuda al enviar a backend
      };
      setCliente(cf);
      onChange && onChange(cf);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updated = { ...cliente, [name]: value };
    setCliente(updated);
    onChange && onChange(updated);

    if (name === "nombre" && editable) {
      setMostrarSugerencias(true);
      try {
        const res = await fetch(`/api/clientes?nombre=${value}`);
        const data = await res.json();
        setSugerencias(data);
      } catch (err) {
        console.error("Error al buscar clientes:", err);
        setSugerencias([]);
      }
    }
  };

  const handleSeleccionSugerido = (clienteSeleccionado) => {
    setCliente(clienteSeleccionado);
    setMostrarSugerencias(false);
    onChange && onChange(clienteSeleccionado);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 space-y-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={editable}
          onChange={handleCheckboxChange}
          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
        />
        Ingresar datos personalizados del cliente
      </label>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 relative">
        {/* Campo con sugerencias */}
        <div className="col-span-2 relative">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={cliente.nombre}
            onChange={handleInputChange}
            disabled={!editable}
            onFocus={() => editable && setMostrarSugerencias(true)}
            onBlur={() => setTimeout(() => setMostrarSugerencias(false), 150)}
            className={`w-full px-4 py-2 rounded-xl border ${
              editable ? "bg-white" : "bg-gray-100"
            } border-gray-300 focus:outline-none focus:ring-2 focus:ring-black`}
          />

          {mostrarSugerencias && sugerencias.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
              {sugerencias.map((s, i) => (
                <li
                  key={s._id}
                  onClick={() => handleSeleccionSugerido(s)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {s.nombre} — {s.dni}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          name="dni"
          placeholder="DNI o CUIT"
          value={cliente.dni}
          onChange={handleInputChange}
          disabled={!editable}
          className={`w-full px-4 py-2 rounded-xl border ${
            editable ? "bg-white" : "bg-gray-100"
          } border-gray-300 focus:outline-none focus:ring-2 focus:ring-black`}
        />
        <input
          type="text"
          name="domicilio"
          placeholder="Domicilio"
          value={cliente.domicilio}
          onChange={handleInputChange}
          disabled={!editable}
          className={`w-full px-4 py-2 rounded-xl border ${
            editable ? "bg-white" : "bg-gray-100"
          } border-gray-300 focus:outline-none focus:ring-2 focus:ring-black`}
        />
        <input
          type="text"
          name="contacto"
          placeholder="Contacto"
          value={cliente.contacto}
          onChange={handleInputChange}
          disabled={!editable}
          className={`w-full px-4 py-2 rounded-xl border ${
            editable ? "bg-white" : "bg-gray-100"
          } border-gray-300 focus:outline-none focus:ring-2 focus:ring-black`}
        />
        <input
          type="email"
          name="mail"
          placeholder="Correo electrónico"
          value={cliente.mail}
          onChange={handleInputChange}
          disabled={!editable}
          className={`w-full px-4 py-2 rounded-xl border ${
            editable ? "bg-white" : "bg-gray-100"
          } border-gray-300 focus:outline-none focus:ring-2 focus:ring-black`}
        />
      </div>
    </div>
  );
}
