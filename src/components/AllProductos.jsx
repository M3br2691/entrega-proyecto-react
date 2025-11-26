import { useState } from "react";
const AllProductos = ({ productos }) => {
  const productosPorPagina = 6; // Cantidad de productos a mostrar por página
  const [paginaActual, setPaginaActual] = useState(1);
  // Calcular el índice de los productos a mostrar en la página actual
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
// Cambiar de página
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
  return (
    <div className="container">
      <h2 className="my-4">Todos los Productos</h2>
      <div className="row">
        {productosActuales.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <div className="card">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">${producto.precio}</p>
                <button className="btn btn-primary w-100">Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
{/* Paginador */}
      <div className="d-flex justify-content-center my-4">
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => cambiarPagina(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
export default AllProductos;
