import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BotonCompra } from "../components/StyledComponents";
export default function Tecnologia() {



  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);
  const { usuario } = useAuthContext();

  useEffect(() => {
    fetch("https://68ed80abdf2025af78005de3.mockapi.io/productos")
      .then(res => res.json())
      .then(data => {
        // Filtrar solo productos de categoría Tecnología
        const tecnologia = data.filter(p => p.categoria === "Tecnologia");
        setProductos(tecnologia);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos de tecnología");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando productos de tecnología...</p>;
  if (error) return <p>{error}</p>;

  const formatoNumero = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });




  const handleAddToCart = () => {
    toast.success("Producto agregado al carrito!");
  };


  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      <h1>Tecnología</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {productos.map((producto, indice) => (
          <div key={producto.id + "-" + indice} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px", textAlign: "center", backgroundColor: "#fff0f5" }}>
            <img src={producto.imagen} alt={producto.nombre} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
            <h4>{producto.nombre}</h4>
            <p>ARS {formatoNumero.format(producto.precio)}</p>
            <div style={{ margin: "10px 0" }}>
              <BotonCompra
                onClick={() => {
                  if (!usuario) {
                    alert("Debes iniciar sesión antes de agregar productos al carrito.");
                    return;
                  }
                  agregarAlCarrito(producto);
                  handleAddToCart();
                }}
              >
                <FaShoppingCart /> Comprar
              </BotonCompra>
            </div>
            <Link to={`/producto/${producto.id}`}
              style={{ textDecoration: "none", color: "blue" }}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
