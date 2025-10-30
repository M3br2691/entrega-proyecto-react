import { createContext, useState } from "react";
// Primero creamos el contexto
export const CarritoContext = createContext();

// ahora creamos el proveedor del contexto

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  // Agregar un producto al carrito
  const agregarAlCarrito = (producto) => { setCarrito([...carrito, producto]); };

  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, indice) => indice !== indiceAEliminar));
  }

  // Vaciar el carrito completo
  const vaciarCarrito = () => { setCarrito([]); }

  // 3️⃣ Retornamos el Provider con los valores que queremos compartir
  return (<CarritoContext.Provider value={
    {
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito
    }
  }>
    {children}

  </CarritoContext.Provider>);
}

export default CarritoContext;