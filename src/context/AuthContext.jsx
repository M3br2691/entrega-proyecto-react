import { createContext, useState, useContext } from 'react';
// Crear el contexto de autenticación

const AuthContext = createContext();
export function AuthProvider({ children }) {
 // const [usuario, setUsuario] = useState(null);

  const [usuario, setUsuario] = useState(() => {
  const token = localStorage.getItem('authToken'); // Busca si hay token guardado
  return token ? token.split('-')[2] : null;       // Extrae el nombre de usuario si existe
});


  const login = (username) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `fake-token-${username}`;
    localStorage.setItem('authToken', token);
    setUsuario(username);
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider> );
}
export const useAuthContext = () => useContext(AuthContext);
