import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext.jsx";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://openlibrary.org/works/${id}.json`
        );
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <main><p>Loading...</p></main>;
  if (!book) return <main><p>Book not found</p></main>;

  let description = "No description available.";
  if (typeof book.description === "string") description = book.description;
  else if (typeof book.description === "object") description = book.description.value;

  return (
    <main className="details">
      <h1>{book.title}</h1>

      <h3>Description</h3>
      <p>{description}</p>

      {/* مجموعة الأزرار أفقية */}
      <div className="button-group">
        <button onClick={() => addToFavorites(book)}>⭐ Add to Favourites</button>
        <a
          className="read-button"
          href={`https://openlibrary.org/works/${id}/borrow`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📖 Read this book
        </a>
      </div>

      <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
        Availability depends on Open Library copyright restrictions.
      </p>
    </main>
  );
};

export default BookDetails;
