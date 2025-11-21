import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Indumentaria() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68ed80abdf2025af78005de3.mockapi.io/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos de indumentaria");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando indumentaria...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Indumentaria</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {productos.map((producto, indice) => (
          <div key={producto.id + "-" + indice} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
            <img src={producto.imagen} alt={producto.nombre} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h4>{producto.nombre}</h4>
            <p>${producto.precio}</p>
            <Link to={`/producto/${producto.id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
