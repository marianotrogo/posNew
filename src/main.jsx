import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ProductoProvider } from './context/ProductoContext.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductoProvider>
        <App />
      </ProductoProvider>
    </BrowserRouter>
  </StrictMode>,
)
