import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tecnologia() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar los productos de tecnología");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando productos de tecnología...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tecnología</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
            <img src={producto.image} alt={producto.title} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h4>{producto.title}</h4>
            <p>${producto.price}</p>
            <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
