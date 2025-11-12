import { useState } from "react";



const FormProducto = ({ onAgregar }) => {
    const [errores, setErrores] = useState({});
    const [producto, setProducto] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
    });

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setProducto({ ...producto, [name]: value });
    };


    const validarForm = () => {
        const nuevosErrores = {};

        if (!producto.nombre.trim())
            nuevosErrores.nombre = "Obligatoriamente debe colocar el nombre"

        if (!producto.precio || producto.precio < 0)
            nuevosErrores.precio = "Debe colocar un precio mayor o igual a cero"

        if (!producto.descripcion.trim () || producto.descripcion.length < 10)
            nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres"

        if (!producto.imagen.trim() || producto.imagen.length < 6)
            nuevosErrores.imagen = "Debes subir una URL de una imagen válida";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (evento) => {
        evento.preventDefault();

        if (!validarForm())
            return;

        const productoAEnviar = {
            ...producto,
            precio: parseFloat(producto.precio)
        };

        onAgregar(productoAEnviar);
        // limpiamos el formulario
        setProducto({ nombre: '', precio: '', descripcion: '', imagen: '' });
        setErrores({});
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Agregar Producto</h2>
                <div>
                    <label>Nombre: </label>
                    <br />
                    <input
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <p style={{ color: "red" }}>{errores.nombre}</p>}
                </div>

                <div>
                    <label>Precio:</label>
                    <br />
                    <input
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={handleChange}
                        min={0}
                        step="any"
                    />
                    {errores.precio && <p style={{ color: "red" }}>{errores.precio}</p>}
                </div>
                <div>
                    <label>Descripcion:</label>
                    <br />
                    <textarea
                        name='descripcion'
                        value={producto.descripcion}
                        onChange={handleChange}
                    />
                    {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
                </div>
                <div>
                    <label>URL de Imagen:</label>
                    <br />
                    <input
                        type='text'
                        name='imagen'
                        value={producto.imagen}
                        onChange={handleChange}
                    />
                    {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>}
                </div>
                <button type="submit">Agregar Producto</button>
            </form>
        </>
    );

}


export default FormProducto;