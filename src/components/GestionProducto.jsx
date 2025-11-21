import { useState } from "react";
import FormProducto from "./FormProducto";
import { useProductoContext } from "../context/ProductoContext";
import styles from "./gestionproducto.module.css";
import CirclePlus from "../assets/CirclePlus";
import SquarePen from "../assets/SquarePen";
import TrashIcon from "../assets/TrashIcon";

const GestionProducto = () => {
  const { productos, eliminarProducto } = useProductoContext();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [modoFormulario, setModoFormulario] = useState("agregar");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const abrirFormularioAgregar = () => {
    setModoFormulario("agregar");
    setProductoSeleccionado(null);
    setMostrarForm(true);
  };

  const abrirFormularioEditar = (producto) => {
    setModoFormulario("editar");
    setProductoSeleccionado(producto);
    setMostrarForm(true);
  };

  const cerrarFormulario = () => {
    setMostrarForm(false);
    setProductoSeleccionado(null);
  };

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(valor);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.cabecera}>
          <h2>Lista de Productos</h2>
          <button onClick={abrirFormularioAgregar} className={styles.botonAgregar}>
            <CirclePlus />
            <p>Agregar Producto</p>
          </button>
        </div>

        {productos.length === 0 ? (
          <p>No hay productos</p>
        ) : (
          <div>
            {productos.map((producto, indice) => (
              <div key={`${producto.id}-${indice}`} className={styles.productoItem}>
                <img className={styles.imagen} src={producto.imagen} alt={producto.nombre} />

                {/* Contenedor de info: nombre, categoría, precio */}
                <div className={styles.productoInfo}>
                  <h3 className={styles.nombreProducto}>{producto.nombre}</h3>
                  <p className={styles.categoriaProducto}>{producto.categoria}</p>
                  <p className={styles.precioProducto}>{formatoPrecio(producto.precio)}</p>
                </div>

                {/* Botones */}
                <button className={styles.boton} onClick={() => abrirFormularioEditar(producto)}>
                  <SquarePen />
                </button>
                <button className={styles.boton} onClick={() => eliminarProducto(producto.id)}>
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {mostrarForm && (
          <FormProducto
            productoInicial={productoSeleccionado || {}}
            modo={modoFormulario}
            onCerrar={cerrarFormulario}
          />
        )}
      </div>
    </div>
  );
};

export default GestionProducto;
