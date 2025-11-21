import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || null);

  // ✅ Array de usuarios registrados
  const usuariosRegistrados = [
    { usuario: "admin", password: "1234", rol: "admin" },
    { usuario: "cliente", password: "abcd", rol: "cliente" },
    { usuario: "profe", password: "prof123", rol: "cliente" } // nuevo usuario
  ];

  const login = (user, password) => {
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.usuario === user && u.password === password
    );

    if (usuarioEncontrado) {
      const tokenGenerado = `token_${usuarioEncontrado.usuario}_123`;
      localStorage.setItem("token", tokenGenerado);
      localStorage.setItem("usuario", usuarioEncontrado.usuario);
      localStorage.setItem("rol", usuarioEncontrado.rol); // opcional si quieres guardar el rol

      setToken(tokenGenerado);
      setUsuario(usuarioEncontrado.usuario);

      return { exito: true, usuario: usuarioEncontrado.usuario, rol: usuarioEncontrado.rol };
    }

    return { exito: false };
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuthContext = () => useContext(AuthContext);
