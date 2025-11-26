import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BotonCompra } from "../components/StyledComponents";
import { Helmet } from "react-helmet-async";

export default function Indumentaria() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);
  const { usuario } = useAuthContext();

  // 🔹 BUSQUEDA
  const [busqueda, setBusqueda] = useState("");

  // 🔹 PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 4;

  useEffect(() => {
    fetch("https://68ed80abdf2025af78005de3.mockapi.io/productos")
      .then((res) => res.json())
      .then((data) => {
        const indumentaria = data.filter((p) => p.categoria === "Indumentaria");
        setProductos(indumentaria);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar productos de indumentaria");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando indumentaria...</p>;
  if (error) return <p>{error}</p>;

  const formatoNumero = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleAddToCart = () => {
    toast.success("Producto agregado al carrito!");
  };

  // 🔹 FILTRO DE BÚSQUEDA
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔹 Cálculo de paginación usando productos filtrados
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimero,
    indiceUltimo
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);

  return (
    <div style={{ padding: "20px" }}>
      <Helmet>
        <title>Indumentaria | Mi Tienda Online</title>
        <meta
          name="description"
          content="Todos nuestros productos de Indumentaria."
        />
      </Helmet>

      <ToastContainer />
      <h1>Indumentaria</h1>

      {/* 🔹 INPUT DE BÚSQUEDA */}
      <input
        type="text"
        placeholder="Buscar indumentaria..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1); // reinicia paginación si busca
        }}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {productosActuales.map((producto, indice) => (
          <div
            key={producto.id + "-" + indice}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
              backgroundColor: "#fff0f5",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />

            <h4>{producto.nombre}</h4>
            <p>ARS {formatoNumero.format(producto.precio)}</p>

            <div style={{ margin: "10px 0" }}>
              <BotonCompra
                onClick={() => {
                  if (!usuario) {
                    alert(
                      "Debes iniciar sesión antes de agregar productos al carrito."
                    );
                    return;
                  }
                  agregarAlCarrito(producto);
                  handleAddToCart();
                }}
              >
                <FaShoppingCart /> Comprar
              </BotonCompra>
            </div>

            <Link
              to={`/producto/${producto.id}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>

      {/* 🔹 PAGINADOR */}
      <div className="d-flex justify-content-center my-4">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={`btn mx-1 ${
              paginaActual === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => cambiarPagina(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
