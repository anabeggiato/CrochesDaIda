import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Products from './pages/products';
import AddProduct from './pages/admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/produtos' element={ <Products /> } />
          <Route path='/admin' element={ <AddProduct /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
