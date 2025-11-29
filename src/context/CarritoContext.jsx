import { createContext, useState, useEffect, useContext } from "react";

export const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {

  // 1) Cargar carrito desde localStorage al iniciar la app
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  // 2) Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // 3) Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      // Buscar si ya existe un producto con el mismo id
      const idx = prev.findIndex(p => p.id === producto.id);

      if (idx !== -1) {
        // Ya existe → aumentar cantidad
        const copia = [...prev];
        copia[idx] = {
          ...copia[idx],
          cantidad: (copia[idx].cantidad || 1) + 1
        };
        return copia;
      } else {
        // No existe → agregar con cantidad 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // 4) Actualizar cantidad de un producto
  const actualizarCantidad = (indice, nuevaCantidad) => {
    setCarrito(prev => {
      const copia = [...prev];

      // Si llega a 0 o menos → eliminar del carrito
      if (nuevaCantidad < 1) {
        return copia.filter((_, i) => i !== indice);
      }

      copia[indice] = {
        ...copia[indice],
        cantidad: nuevaCantidad
      };

      return copia;
    });
  };

  // 5) Eliminar producto por índice
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(prev => prev.filter((_, i) => i !== indiceAEliminar));
  };

  // 6) Vaciar todo el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export default CarritoContext;
