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

function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(true)

  const cerrarSesion = () => setEstaAutenticado(false)

  return (
    <>
      <header>
        <Header />
        {
          estaAutenticado
            ? <button onClick={cerrarSesion}>Cerrar Sesión</button>
            : <button onClick={iniciarSesion}>Iniciar Sesión</button>
        }
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/indumentaria" element={<Indumentaria />} />
          <Route path="/acerca" element={<Acerca />} />
          <Route path="/politica" element={<Politica />} />

          {/* Ruta protegida para el carrito */}
          <Route
            path="/carrito"
            element={
              <RutaProtegida estaAutenticado={estaAutenticado}>
                <Carrito />
              </RutaProtegida>
            }
          />

          {/* Ruta protegida para Admin */}
          <Route
            path="/admin"
            element={
              <RutaProtegida estaAutenticado={estaAutenticado}>
                <Admin />
              </RutaProtegida>
            }
          />
          <Route path="/login" element={<Login />} />

        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
