import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { useProductoContext } from "../context/ProductoContext";
import { useAuthContext } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { BotonCompra } from "./StyledComponents";

const Productos = () => {
  const { productos, cargando, error } = useProductoContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { usuario } = useAuthContext();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  if (cargando) return "Cargando productos...";
  if (error) return error;

  const formatoNumero = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleAddToCart = () => {
    toast.success("Producto agregado al carrito!");
  };

  // 🔍 FILTRO DE BÚSQUEDA
  const productosFiltrados = (productos || []).filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🧭 PAGINACIÓN (siempre sobre productosFiltrados)
  const productosPorPagina = 4;
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;

  const productosActuales = productosFiltrados.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (n) => setPaginaActual(n);

  return (
    <div style={{ padding: "20px" }}>
      <Helmet>
        <title>Productos | Mi Tienda Online</title>
        <meta
          name="description"
          content="Listado completo de productos disponibles en nuestra tienda."
        />
      </Helmet>

      <ToastContainer />
      <h2>Productos</h2>

      {/* 🔍 INPUT DE BÚSQUEDA */}
      <input
        type="text"
        placeholder="Buscar productos..."
        className="form-control mb-3"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1); // 🧠 al buscar, volver a página 1
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
            key={`${producto.id}-${indice}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fff0f5",
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />

            <h4>{producto.nombre}</h4>
            <p>ARS {formatoNumero.format(producto.precio)}</p>
            <h4>{producto.categoria}</h4>

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

            <div style={{ marginTop: "10px" }}>
              <Link
                to={`/producto/${producto.id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINADOR */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center my-4">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              className={`btn mx-1 ${
                paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
