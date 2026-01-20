import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`https://openlibrary.org${id}.json`);
        const data = await res.json();
        setBook(data);
      } catch {
        setError("Failed to load book details 😕");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>No details found.</p>;

  const coverId = book.covers?.[0];

  return (
    <div style={{ textAlign: "center" }}>
      <h2>{book.title}</h2>

      {coverId && (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
          alt={book.title}
          width="200"
          style={{ borderRadius: "8px", margin: "1rem 0" }}
        />
      )}

      <p><strong>Description:</strong></p>
      <p>{book.description?.value ?? book.description ?? "No description available 😕"}</p>
      <p><strong>First Published:</strong> {book.first_publish_date ?? "Unknown"}</p>

      <Link to="/" style={{ display: "inline-block", marginTop: "1rem", color: "#4a90e2" }}>
        ⬅️ Back to Search
      </Link>
    </div>
  );
}
