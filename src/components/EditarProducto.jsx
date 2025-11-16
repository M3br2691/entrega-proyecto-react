

import { useState, useEffect } from "react";


const EditarProducto = ({ productoSeleccionado, onActualizar }) => {
    const [producto, setProducto] = useState(productoSeleccionado || {
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: ''
    });

    const API = "https://68ed80abdf2025af78005de3.mockapi.io/productos";

    useEffect(() => {
        if (productoSeleccionado) {
            setProducto(productoSeleccionado);
        }
    }, [productoSeleccionado]
    );

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setProducto({ ...producto, [name]: value });
    };
    const handleSubmit = async (evento) => {
        evento.preventDefault();
        if (!producto.id) {
            alert("No se encontró el ID del producto.");
            return;
        }

        try {
            const respuesta = await fetch(`${API}/${producto.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error("Error al actualizar el producto");

           
            const datos = await respuesta.json();
            onActualizar(datos);
            setProducto({
                nombre: '',
                precio: '',
                descripcion: '',
                imagen: ''
            });
            alert("Producto actualizado correctamente.");



        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            alert("Hubo un error al actualizar el producto.");
        }
    };
    if (!productoSeleccionado) {
        return <p>Selecciona un producto para editar.</p>;
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="form-editar">
                <h2>Editar Producto</h2>
                <div>
                    <label>Nombre: </label>
                    <br />
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre || ''}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div>
                    <label>Precio:</label>
                    <br />
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio || ''}
                        onChange={handleChange}
                        required
                        min={0}
                        step="any"
                    />

                </div>
                <div>
                    <label>Descripcion:</label>
                    <br />
                    <textarea
                        name='descripcion'
                        value={producto.descripcion || ''}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div>
                    <label>URL de Imagen:</label>
                    <br />
                    <input
                        type='text'
                        name='imagen'
                        value={producto.imagen || ''}
                        onChange={handleChange}
                    />

                </div>
                <button type="submit">Actualizar Producto</button>
            </form>
        </>);
}

export default EditarProducto;

