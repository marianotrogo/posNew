// components/products/ModalAgregarStock.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

const ModalAgregarStock = ({ isOpen, onClose, onGuardar }) => {
  const [combinaciones, setCombinaciones] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setCombinaciones(
        Array.from({ length: 5 }, () => ({ talle: "", stock: "" }))
      );
    }
  }, [isOpen]);

  const agregarFila = () => {
    if (combinaciones.length >= 10) return;
    setCombinaciones([...combinaciones, { talle: "", stock: "" }]);
  };

  const actualizarCampo = (index, campo, valor) => {
    const copia = [...combinaciones];
    copia[index][campo] = campo === "stock" ? Math.max(0, Number(valor)) : valor;
    setCombinaciones(copia);
  };

  const guardarCombinaciones = () => {
    const filtradas = combinaciones
      .filter((c) => c.talle.trim() !== "" && c.stock !== "")
      .map((c) => ({
        talle: c.talle.trim(),
        stock: Number(c.stock),
      }));

    onGuardar(filtradas);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold mb-4">
                Agregar Talles y Stock
              </Dialog.Title>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {combinaciones.map((combo, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Talle"
                      value={combo.talle}
                      onChange={(e) =>
                        actualizarCampo(index, "talle", e.target.value)
                      }
                      className="border p-2 w-1/2 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      min="0"
                      value={combo.stock}
                      onChange={(e) =>
                        actualizarCampo(index, "stock", e.target.value)
                      }
                      className="border p-2 w-1/2 text-sm"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={agregarFila}
                disabled={combinaciones.length >= 10}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                + Agregar otra combinación
              </button>

              <div className="flex justify-end gap-2 pt-6">
                <button
                  onClick={onClose}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancelar
                </button>
                <button
                  onClick={guardarCombinaciones}
                  className="bg-black text-white px-4 py-1 text-sm"
                >
                  Guardar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalAgregarStock;
