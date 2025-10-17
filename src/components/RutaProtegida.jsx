import { Navigate } from "react-router-dom";

export default function RutaProtegida({ estaAutenticado, children }) {
  if (!estaAutenticado) {
    return <Navigate to="/login" />
  }
  return children;
}
