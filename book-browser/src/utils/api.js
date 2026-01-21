export const searchBooks = async (query) => {
  if (!query) return [];
  const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
  if (!res.ok) throw new Error("Failed to fetch books");
  const data = await res.json();
  return data.docs;
};

export const getBookDetails = async (id) => {
  const res = await fetch(`https://openlibrary.org/works/${id}.json`);
  if (!res.ok) throw new Error("Failed to fetch book details");
  return res.json();
};

