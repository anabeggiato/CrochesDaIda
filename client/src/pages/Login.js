// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/admin'); // Redireciona para rota protegida
    } catch (error) {
      setMensagemErro(
        error.response?.data?.message || 'Erro ao fazer login'
      );
    }
  };

  return (
    <div className="login-container" style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
    </div>
  );
}

export default Login;
