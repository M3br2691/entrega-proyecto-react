import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://68ed80abdf2025af78005de3.mockapi.io/productos/${id}`)
      .then((res) => res.json())
      .then((dato) => setProducto(dato));
  }, [id]);

  if (!producto) return <p>Cargando ......</p>;

  return (
    <>
      <h2>Detalles del Producto Nro {id}</h2>
      <img src={producto.imagen} alt={producto.nombre} width={150} height={150} style={{ objectFit: "contain" }} />
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      <p>{producto.descripcion}</p>
    </>
  );
};

export default ProductoDetalle;
