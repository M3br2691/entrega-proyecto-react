import { useEffect } from "react";
import { useState } from "react";
import styles from './GestionProducto.module.css'
import CirclePlus from "../assets/CirclePlus";
import FormProducto from "./FormProducto";
import EditarProducto from "./EditarProducto";


const GestionProducto = () => {
    const API = "https://68ed80abdf2025af78005de3.mockapi.io/productos";
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);

    //Paso 1: crear un estado para controlar la visibilidad del formularioEste estado nos permitirá “encender” o “apagar” el formulario.
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            setCargando(true);
            const respuesta = await fetch(API)
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            alert("Error al cargar productos");
        }
        finally {
            setCargando(false);
        }
    };

    // función para seleccionar un producto
    const seleccionarProducto = (producto) => {
        setProductoSeleccionado(producto);
    };

    if (cargando)
        return <div>... cargando productos...</div>
{/* La llevo para el ProductoContext
    
    // función para agregar productos a la API

    const agregarProducto = async (producto) => {
        try {
            const respuesta = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(producto)
            });

            if (!respuesta.ok) throw new Error("Error al agregar el producto.");

            const datos = await respuesta.json();
            console.log("Producto agregado: ", datos);
            alert("Producto agregado correctamente");

            // agregar el nuevo producto a la lista
            setProductos([...productos, datos]);

        } catch (error) {
            console.error(error.message);
            alert("Hubo un problema al agregar el producto.");
        }
    };
*/}
    // función para eliminar un producto

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm("¿Estás seguro de querer eliminar este producto?");

        if (confirmar) {
            try {
                const respuesta = await fetch(`${API}/${id}`, {
                    method: "DELETE",
                });

                if (!respuesta.ok)
                    throw new Error("Error al eliminar el producto");

                // Filtra y crea un nuevo array sin el producto eliminado

                setProductos(productos.filter(p => p.id !== id));

            }
            catch (error) {
                console.error(error.message);
                alert("Hubo un problema al eliminar el producto.");
            }
        }
    };
    // paso 2 de mostrar formulario
    const alternarFormulario = () => {
        setMostrarFormulario(!mostrarFormulario);
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.panel}>
                    {/* <div className={styles.botonAgregarProducto}>
                    <CirclePlus />
                    <p>Agregar Producto</p>
                </div>*/}
                    <div className={styles.botonAgregarProducto} onClick={alternarFormulario}>
                        <CirclePlus />
                        <p>{mostrarFormulario ? "Ocultar formulario" : "Agregar Producto"}</p>
                    </div>
                    {productos.map((producto) => (
                        <div
                            key={producto.id}
                            onClick={() => seleccionarProducto(producto)}
                            className={styles.productoItem}
                        >
                            <img className={styles.imagen} src={producto.imagen} alt={producto.nombre} />
                            <h3>{producto.nombre}</h3>
                            <p>Precio: ${producto.precio}</p>
                            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
                {/*Formulario para editar producto*/}
                <div className={styles.panel}>
                   {/* <FormProducto onAgregar={agregarProducto} />*/}
                   {mostrarFormulario && <FormProducto onAgregar={agregarProducto} />}
                    <EditarProducto
                        productoSeleccionado={productoSeleccionado}
                        onActualizar={cargarProductos}
                    />
                </div>
            </div>
        </div>

    );
};



export default GestionProducto;