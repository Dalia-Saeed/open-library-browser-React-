import { useEffect, useState } from "react";
import { FavouritesContext } from "./FavouritesContext";

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (book) => {
    if (!favourites.some((b) => b.key === book.key)) {
      setFavourites([...favourites, book]);
    }
  };

  const removeFavourite = (key) => {
    setFavourites(favourites.filter((book) => book.key !== key));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;
