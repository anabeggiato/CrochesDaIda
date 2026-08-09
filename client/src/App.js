import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AdminPage from './pages/AdminPage';
import AdminProductsPage from './pages/AdminProductsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Rotas protegidas */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/produtos"
            element={
              <PrivateRoute>
                <AdminProductsPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
