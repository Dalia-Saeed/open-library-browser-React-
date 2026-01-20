import { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Home() {
  const [query, setQuery] = useState("");        
  const [books, setBooks] = useState([]);        
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);      

  const { favorites, addFavorite } = useFavorites();

  async function searchBooks() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`
      );
      const data = await response.json();
      setBooks(data.docs);
    } catch {
      setError("Something went wrong 😕");
    } finally {
      setLoading(false);
    }
  }

  function isFavorite(book) {
    return favorites.some((b) => b.key === book.key);
  }

  return (
    <div>
      <h2>Search Books 📚</h2>

      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <button onClick={searchBooks} style={{ marginLeft: "1rem", padding: "8px" }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {books.slice(0, 20).map((book) => (
          <li
            key={book.key}
            style={{
              marginBottom: "12px",
              padding: "8px",
              background: "#f0f8ff",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Link to={`/book/${book.key}`} style={{ textDecoration: "none", color: "#333" }}>
              {book.title} — {book.author_name?.[0] ?? "Unknown"}
            </Link>

            <button
              onClick={() => addFavorite(book)}
              style={{
                background: isFavorite(book) ? "gold" : "#4a90e2",
                color: isFavorite(book) ? "#333" : "white"
              }}
              disabled={isFavorite(book)}
            >
              {isFavorite(book) ? "⭐ Added" : "⭐ Add"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
