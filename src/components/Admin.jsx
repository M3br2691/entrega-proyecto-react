
import { Link } from "react-router-dom";

import GestionProducto from "./GestionProducto";

const Admin = () => {

  return (
    <div>
       <div style={{ padding: "20px" }}></div>
      <h1>Panel de Administración</h1>
      <h1>Gestión de Productos</h1>
      <p>Desde aquí podrías gestionar productos, revisar pedidos, o editar precios.</p>
        <div>
          <GestionProducto />
        </div>

            <li>
                <Link to="/admin" >Admin</Link>
            </li>
           
    </div>

  );
};


export default Admin;
