import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

  const formatoNumero = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Carrito</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {carrito.map((producto, indice) => (
          <div
            key={`${producto.id}-${indice}`}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              backgroundColor: "#f8f8f8"
            }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                marginBottom: "10px"
              }}
            />
            <h4>{producto.nombre}</h4>
            <p>ARS {formatoNumero.format(producto.precio)} </p>
            <button onClick={() => eliminarDelCarrito(indice)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrito;
