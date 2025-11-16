import { useState, useEffect } from "react";
import FormProducto from "./FormProducto";
import { useProductoContext } from "../context/ProductoContext";
import styles from "./gestionproducto.module.css";
import CirclePlus from "../assets/CirclePlus";
import SquarePen from "../assets/SquarePen";
import TrashIcon from "../assets/TrashIcon";

const GestionProducto = () => {
    // Cargando contexto de producto
    const { productos, eliminarProducto } = useProductoContext();
    // Estados 
    const [mostrarForm, setMostrarForm] = useState(false);
    const [modoFormulario, setModoFormulario] = useState("agregar");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    // Abrir formulario para AGREGAR
    const abrirFormularioAgregar = () => {
        setModoFormulario("agregar");
        setProductoSeleccionado(null); // Sin producto inicial
        setMostrarForm(true);
    };

    // Abrir formulario para EDITAR
    const abrirFormularioEditar = (producto) => {
        setModoFormulario("editar");
        setProductoSeleccionado(producto); // Pasar el producto a editar
        setMostrarForm(true);
    };

    // Cerrar formulario
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
                    <button
                        onClick={abrirFormularioAgregar}
                        className={styles.botonAgregar}
                    >
                        <CirclePlus />
                        <p>Agregar Producto</p>
                    </button>
                </div>
                <div>
                    {productos.length === 0 ? (
                        <p>No hay productos</p>
                    ) : (
                        <div style={{ display: "grid", gap: "5px" }}>
                            {productos.map((producto) => (
                                <div
                                    key={producto.id}
                                    className={styles.productoItem}
                                >
                                    <img className={styles.imagen} src={producto.imagen} alt={producto.nombre} />
                                    <h3 className={styles.nombreProducto}>{producto.nombre}</h3>
                                    <p className={styles.precioProducto}>
                                        {formatoPrecio(producto.precio)}
                                    </p>
                                    <button
                                        className={styles.boton}
                                        onClick={() => abrirFormularioEditar(producto)}
                                    >
                                        <SquarePen />
                                    </button>
                                    <button
                                        className={styles.boton}
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {mostrarForm && (
                    <>
                        <FormProducto
                            productoInicial={productoSeleccionado || {}}
                            modo={modoFormulario}
                            onCerrar={cerrarFormulario}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default GestionProducto;
