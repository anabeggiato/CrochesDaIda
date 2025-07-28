// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username,
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/admin');
    } catch (error) {
      setMensagemErro(
        error.response?.data?.message || 'Erro ao fazer login'
      );
    }
  };

  return (
    <LoginPage>
      <LoginContainer>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete='off'
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='off'
          />

          <button type="submit">Entrar</button>
        </form>

        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      </LoginContainer>
    </LoginPage>
  );
}

const LoginPage = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #C514DB;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(250, 214, 255);

  padding: 7rem;
  border-radius: 30px;
  box-shadow: 5px 16px 20px rgb(159, 0, 180);

  h2 {
    margin-bottom: 1rem;
    color: #C514DB;
  }

  button {
    border: none;
    padding: .5rem 0;
    border-radius: 15px;
    background-color: #C514DB;
    color: #fff;
  }

  button:hover {
    cursor: pointer;
    background-color: #860194;
  }

  input {
    border: none;
    border-radius: 10px;
    padding-left: .5rem;
  }

`

export default Login;

