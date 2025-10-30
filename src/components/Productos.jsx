import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

function Productos({ agregarProducto }) {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // usar el contexto

  const {agregarAlCarrito} = useContext(CarritoContext);

  const URL = "https://fakestoreapi.com/products";

useEffect(() => {
  fetch(URL)
    .then(respuesta => respuesta.json())
    .then((datos) => {
      setProductos(datos);
      setCargando(false);
    })
    .catch(() => {
      setError('Error al cargar productos');
      setCargando(false);
    });
}, []);

if (cargando) return 'Cargando productos...';

if (error) return error;

return (
  <div style={{ padding: "20px" }}>
    <h2>Productos</h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
      }}
    >
      {productos.map((producto) => (
        <div
          key={producto.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            backgroundColor: "#f8f8f8",
          }}
        >
          <img
            src={producto.image}
            alt={producto.title}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
          <h4>{producto.title}</h4>
          <p>${producto.price}</p>
          <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>

          <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
        </div>
      ))}
    </div>
  </div>
);
}

export default Productos;

