import React from 'react';
import { FaHome, FaShoppingCart, FaBox, FaSignInAlt, FaBars } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <>
    {/* Botón hamburguesa sólo en móvil */}
    <button
      onClick={toggleSidebar}
      className="md:hidden fixed top-4 left-4 z-50 text-black bg-white p-2 rounded shadow"
    >
      <FaBars size={20} />
    </button>

    {/* Sidebar */}
    <div
      className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        w-48
      `}
    >
      {/* Cerrar sólo en móvil */}
      <div className="flex justify-end md:hidden p-4">
        <button onClick={toggleSidebar} className="text-white">
          <IoCloseSharp size={24} />
        </button>
      </div>

      {/* Menú */}
      <nav className="flex flex-col space-y-2 px-4">
        <Link to="/"         className="flex items-center py-3 hover:bg-gray-700 rounded">
          <FaHome className="mr-3" /> Home
        </Link>
        <Link to="/sales"    className="flex items-center py-3 hover:bg-gray-700 rounded">
          <FaShoppingCart className="mr-3" /> Ventas
        </Link>
        <Link to="/products" className="flex items-center py-3 hover:bg-gray-700 rounded">
          <FaBox className="mr-3" /> Productos
        </Link>
        <Link to="/login"    className="flex items-center py-3 hover:bg-gray-700 rounded">
          <FaSignInAlt className="mr-3" /> Login
        </Link>
      </nav>
    </div>
  </>
);

export default Sidebar;
