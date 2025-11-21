import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RutaProtegida = ({ children, requiereAdmin = false }) => {
  const { usuario } = useAuthContext();

  if (!usuario) return <Navigate to="/login" />;

  // Si requiere admin y el usuario NO es admin
  if (requiereAdmin && usuario !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default RutaProtegida;
