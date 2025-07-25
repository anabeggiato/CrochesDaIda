import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth`, form);
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Login do Admin</h2>

        <input
          name="username"
          placeholder="Usuário"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Entrar</button>

        {error && <span className="error">{error}</span>}
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 10px;
  }

  input {
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    background-color: #444;
    color: white;
    border: none;
    cursor: pointer;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    text-align: center;
  }
`;
