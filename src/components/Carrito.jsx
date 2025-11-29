import { useCarrito } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito } = useCarrito();

  // Calcular subtotal
  const subtotal = carrito.reduce((acc, producto) => {
    return acc + producto.precio * producto.cantidad;
  }, 0);
// Costo de envío
const envio = 1500; // ejemplo → podés cambiarlo

// Total final
const total = subtotal + envio;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Carrito</h2>

      {/* Botón vaciar carrito */}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-danger mb-3"
          onClick={() => {
            if (window.confirm("¿Seguro que quieres vaciar todo el carrito?")) {
              vaciarCarrito();
            }
          }}
        >
          Vaciar carrito
        </button>
      </div>

      {/* Si el carrito está vacío */}
      {carrito.length === 0 ? (
        <p className="text-center">El carrito está vacío</p>
      ) : (
        carrito.map((producto, indice) => (
          <div
            key={indice}
            className="card mb-3 p-3"
          >
            <div className="row g-3 align-items-center">

              {/* Imagen */}
              <div className="col-md-2">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="img-fluid rounded"
                />
              </div>

              {/* Información */}
<div className="col-md-4">
  <h5>{producto.nombre}</h5>

  {/* Precio unitario */}
  <p>Precio unitario: <strong>${producto.precio.toLocaleString()}</strong></p>

  {/* Cantidad */}
  <p>Cantidad: <strong>{producto.cantidad}</strong></p>

  {/* Subtotal */}
  <p>
    Subtotal:{" "}
    <strong>
      ${(producto.precio * producto.cantidad).toLocaleString()}
    </strong>
  </p>
</div>

              {/* Controles cantidad */}
              <div className="col-md-3 d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    actualizarCantidad(indice, producto.cantidad - 1)
                  }
                >
                  –
                </button>

                <span className="mx-3 fs-5">
                  {producto.cantidad}
                </span>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    actualizarCantidad(indice, producto.cantidad + 1)
                  }
                >
                  +
                </button>
              </div>

              {/* Eliminar */}
              <div className="col-md-2 text-end">
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarDelCarrito(indice)}
                >
                  Eliminar
                </button>
              </div>

            </div>
          </div>
        ))
      )}

{/* Resumen */}
{carrito.length > 0 && (
  <div className="card p-3 mt-4">

    <h4 className="mb-3">Resumen de compra</h4>

    {/* Subtotal */}
    <p className="d-flex justify-content-between">
      <span>Subtotal:</span>
      <span>${subtotal.toLocaleString()}</span>
    </p>

    {/* Envío */}
    <p className="d-flex justify-content-between">
      <span>Envío:</span>
      <span>
        {envio === 0 ? (
          <strong className="text-success">¡Gratis!</strong>
        ) : (
          `$${envio.toLocaleString()}`
        )}
      </span>
    </p>

    <hr />

    {/* Total final */}
    <h4 className="d-flex justify-content-between">
      <span>Total:</span>
      <span>${total.toLocaleString()}</span>
    </h4>

    <button className="btn btn-primary mt-3">
      Proceder al pago
    </button>

  </div>
)}
    </div>
  );
};

export default Carrito;
