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
    // Simulación de autenticación
    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/admin');
    } else {
      alert('Usuario o Contraseña inválido');
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <label htmlFor="">Usuario</label>
        {/* Aquí está el formulario */}
        <input
          type="text"
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
        />

        <label htmlFor=''>Contraseña:</label>
        <input
          type="text"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
        />

        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
}
export default Login;