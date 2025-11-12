
import { Link } from "react-router-dom";
import FormProducto from "./FormProducto";

const Admin = () => {
  const API= "https://68ed80abdf2025af78005de3.mockapi.io/productos";

  const agregarProducto= async (producto) => {
    try {
      const respuesta = await fetch(API, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto)
      });

      if(!respuesta.ok) throw new Error("Error al cargar el producto.");

      const dato = await respuesta.json();
      console.log("Producto agregado: ", dato);
      alert("Producto agregado correctamente");
    } catch (error){
      console.error(error.message);
      alert("Hubo un problema al agregar el producto.");
    }
  };

  return (
    <div>
       <div style={{ padding: "20px" }}></div>
      <h1>Panel de Administración</h1>
      <h1>Gestión de Productos</h1>
      <p>Desde aquí podrías gestionar productos, revisar pedidos, o editar precios.</p>
            <li>
                <Link to="/admin" >Admin</Link>
            </li>
            <FormProducto onAgregar={agregarProducto} />
    </div>

  );
};


export default Admin;
