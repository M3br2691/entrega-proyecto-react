import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Carrito from './components/Carrito'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom"
import Productos from "./components/Productos"
import ProductoDetalle from './pages/ProductoDetalle'
import Inicio from './pages/Inicio'
import Acerca from "./pages/Acerca"
import Politica from "./pages/Politica"
import Tecnologia from './pages/Tecnologia'
import Indumentaria from './pages/Indumentaria'
import Admin from './components/Admin'
import RutaProtegida from "./components/RutaProtegida"
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext';





function App() {
  

  return (
    <>
         <AuthProvider>
        <Header />
     
        <Routes>
          <Route path="/" element={<Inicio />} />
         
         
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/indumentaria" element={<Indumentaria />} />
          <Route path='/login' element={<Login />} />
           <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/politica" element={<Politica />} />

          {/* Ruta protegida para Carrito */}
          <Route
            path="/carrito"
            element={
              <RutaProtegida>
                <Carrito />
              </RutaProtegida>
            }
          />

          {/* Ruta protegida para Admin */}
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <Admin />
              </RutaProtegida>
            }
          />
          
        </Routes>
      

      <footer>
        <Footer />
      </footer>
      </AuthProvider>
    </>
  )
}

export default App;

