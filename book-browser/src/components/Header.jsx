import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link to="/">📚 Book Browser</Link>
      <Link to="/favourites"> ⭐ Favorites</Link>
    </header>
  );
};

export default Header;
