import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext.jsx";

const Favourites = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <main>
        <h2>Your Favourites List is Empty 😢</h2>
        <p>Add some books to your favourites from the home page.</p>
      </main>
    );
  }

  return (
    <main>
      <h2>Your Favourites ❤️</h2>
      <div className="book-grid">
        {favorites.map((book) => (
          <div key={book.key} className="book-card">
            <Link to={`/book/${book.key.replace("/works/", "")}`}>
              <h3>{book.title}</h3>
            </Link>
            <p>{book.author_name?.join(", ")}</p>
            <button onClick={() => removeFromFavorites(book.key)}>
              Remove from Favourites
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Favourites;
