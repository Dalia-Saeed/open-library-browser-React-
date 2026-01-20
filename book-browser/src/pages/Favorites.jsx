import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div>
        <h2>Favorites ⭐</h2>
        <p>You don't have any favorite books yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Favorites ⭐</h2>
      <ul>
        {favorites.map((book) => (
          <li
            key={book.key}
            style={{
              marginBottom: "12px",
              padding: "8px",
              background: "#fff3cd",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {book.title} — {book.author_name?.[0] ?? "Unknown"}

            <button
              onClick={() => removeFavorite(book.key)}
              style={{
                background: "#f44336",
                color: "white"
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
