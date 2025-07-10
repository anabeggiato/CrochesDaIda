import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './pages/products';
import Admin from './pages/admin';
import Home from './pages/home'
import Product from './pages/product';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/produtos' element={ <Products /> } />
          <Route path='/produto/:id' element={ <Product /> } />
          <Route path='/admin' element={ <Admin /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
