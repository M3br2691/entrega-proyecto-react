import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext.jsx' // 👈 Importa el Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App /> {/* 👈 Envolvemos la app dentro del provider */}
      </CarritoProvider>
      
    </BrowserRouter>
    
  </StrictMode>,
)
