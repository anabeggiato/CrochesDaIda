import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Products from './pages/products';
import Admin from './pages/admin';
import Home from './pages/home'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/produtos' element={ <Products /> } />
          <Route path='/admin' element={ <Admin /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
