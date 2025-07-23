import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './pages/products';
import Admin from './pages/admin';
import Teste from './pages/Teste';
import AdminProducts from './pages/AdminProducts';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/produto/:id' element={<Teste />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/produtos' element={<AdminProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
