// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Sales     from './pages/Sales';
import Products  from './pages/Products';
import Login     from './pages/Login';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(open => !open);

  return (
    <Router>
      {/* Evita cualquier overflow horizontal en toda la app */}
      <div className="relative flex overflow-x-hidden">
        {/* Sidebar: se superpone en móvil, fija en desktop */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Contenido: siempre pl-0 en móvil, siempre md:pl-48 en desktop */}
        <div className="flex-1 p-6 pl-0 md:pl-48">
          <Routes>
            <Route path="/"         element={<Dashboard />} />
            <Route path="/sales"    element={<Sales />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login"    element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
