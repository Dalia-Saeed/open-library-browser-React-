import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BookDetails from "./pages/BookDetails.jsx";
import Favourites from "./pages/Favourites.jsx";

function App() {
  return (
    <>
      <header>
        <h1>📚 Book Browser</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favourites">
          Favourites ⭐ {Favourites}
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  );
}

export default App;
