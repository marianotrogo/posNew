import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';import { ProductoProvider } from './context/ProductoContext'; // 💥 Agregado
import EditarProducto from './components/products/EditarProducto';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Products from './pages/Products';
import Login from './pages/Login';

import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(open => !open);

  return (
    
      <ProductoProvider> {/* ✅ Agregado */}
        
        <div className="relative flex overflow-x-hidden">
          <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 p-6 pl-0 md:pl-48">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/products" element={<Products />} />
              <Route path='/products/edit/:codigo' element={<EditarProducto/>}/>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </ProductoProvider>
    
  );
};

export default App;