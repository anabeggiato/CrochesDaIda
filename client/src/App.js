import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Products from './pages/products';
import Admin from './pages/admin';
import AdminProducts from './pages/AdminProducts';
import Contact from './pages/Contact';
import Login from './pages/Login'; // se você já tiver
import PrivateRoute from './components/PrivateRoute'; // componente de proteção

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/produtos"
            element={
              <PrivateRoute>
                <AdminProducts />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
