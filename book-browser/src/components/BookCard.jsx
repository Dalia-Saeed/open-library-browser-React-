import { Link } from "react-router-dom";

const BookCard = ({ book, addToFavorites }) => {
  return (
    <div className="book-card">
      <Link to={`/book/${book.key.replace("/works/", "")}`}>
        <h3>{book.title}</h3>
      </Link>
      <p>{book.author_name?.join(", ")}</p>
      {addToFavorites && (
        <button onClick={() => addToFavorites(book)}>⭐ Add to Favourites</button>
      )}
    </div>
  );
};

export default BookCard;
