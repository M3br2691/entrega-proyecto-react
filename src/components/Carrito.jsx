import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);
  const formatoNumero = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return (
    //<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 4fr))", gap: "20px" }}>
    <div>
      <h2>Carrito</h2>
      <br />
      {carrito.map((producto, indice) => (
        <div key={indice}>
          <img src={producto.imagen} alt={producto.nombre} height={80} width={80} />
          <p> {producto.nombre}:  </p>
          <p>${formatoNumero.format(producto.precio)} ARS</p>
          <button onClick={() => eliminarDelCarrito(indice)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;