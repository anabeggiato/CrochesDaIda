import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/products';
import Admin from './pages/admin';
import AdminProducts from './pages/AdminProducts';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/contato' element={<Contact />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/produtos' element={<AdminProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
