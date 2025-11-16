import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useContext } from 'react';
import { useProductoContext } from "../context/ProductoContext";

const Productos = () => {


  const { productos, cargando, error } = useProductoContext();
  const { agregarAlCarrito } = useContext(CarritoContext);

  if (cargando) return "Cargando productos...";
  if (error) return error;

  const formatoNumero = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Productos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px", textAlign: "center", backgroundColor: "#f8f8f8" }}>
            <img src={producto.imagen} alt={producto.nombre} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h4>{producto.nombre}</h4>
            <p>${formatoNumero.format(producto.precio)} ARS</p>

            <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
            <div style={{ marginTop: "10px" }}>
              <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
