import { useState } from 'react';
import { useContext } from 'react';
import Productos from '../components/Productos';

import { CarritoContext } from '../context/CarritoContext';

const Inicio = () => {
  const {agregarAlCarrito} = useContext(CarritoContext);
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, indice) => indice !== indiceAEliminar));
  }

  return(
    <>
      <Productos />

    </>
  );
}

export default Inicio;