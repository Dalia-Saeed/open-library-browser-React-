import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Favorites from './pages/Favorites.jsx';
import './App.css';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}
