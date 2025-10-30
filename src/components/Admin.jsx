
function Admin() {
  return (
    <div>
       <div style={{ padding: "20px" }}></div>
      <h1>Panel de Administración</h1>
      <p>Desde aquí podrías gestionar productos, revisar pedidos, o editar precios.</p>
                  <li>
                <Link to="/admin" >Admin</Link>
            </li>
    </div>
  )
}


export default Admin;
