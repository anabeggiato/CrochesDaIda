import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; // em segundos

    if (decoded.exp < now) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }

    return children;
  } catch (err) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
