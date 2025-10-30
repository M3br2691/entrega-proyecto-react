import { createContext, useState } from "react";
// Primero creamos el contexto
export const ProductoContext = createContext();

// ahora creamos el proveedor del contexto

export function ProductoProvider ({ children}) {
    const [producto, setProducto] = useState([]);
    

    
  // 3️⃣ Retornamos el Provider con los valores que queremos compartir
return(<ProductoContext.Provider value ={{producto, agregarProducto, eliminarProducto}}> {children}

</ProductoContext.Provider>);
}

export default ProductoContext;
