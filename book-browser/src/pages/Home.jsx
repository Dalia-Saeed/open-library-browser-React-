import { useState, useEffect, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext.jsx";
import BookCard from "../components/BookCard.jsx";

const Home = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setBooks(data.docs.slice(0, 20)); // limit results
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <main>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              addToFavorites={addToFavorites}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
