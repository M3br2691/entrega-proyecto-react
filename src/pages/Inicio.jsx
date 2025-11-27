import { useState } from 'react';
import { useContext } from 'react';
import Productos from '../components/Productos';
import { Helmet } from "react-helmet-async";
import { CarritoContext } from '../context/CarritoContext';



const Inicio = () => {
  const {agregarAlCarrito} = useContext(CarritoContext);
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito(carrito.filter((_, indice) => indice !== indiceAEliminar));
  }

  return(
    <>
            <Helmet>
                <title>Productos | Mi Tienda Online</title>
                <meta name="description" content="Todos nuestros productos destacados." />
            </Helmet>

            <h1>Bienvenidos</h1>
            <Productos />
            
        </>
    
  );

  
}

export default Inicio;