import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    // Llamo al login del AuthContext
    const resultado = login(usuario, password);

    if (resultado.exito) {
      // Si es admin → va al panel admin
      if (resultado.usuario === "admin") {
        navigate('/admin');
      }

      // Si es cliente → va a la tienda
      if (resultado.usuario === "cliente") {
        navigate('/');
      }

    } else {
      alert('Usuario o Contraseña inválido');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label>Usuario:</label>
        <input
          type="text"
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
};

export default Login;
