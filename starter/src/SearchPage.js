import { search } from "./BooksAPI";
import Book from "./components/Book";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchPage = ({ onChangeShelf, bookShelves }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query === "" || query === " ") {
        setBooks([]);
      } else {
        search(query).then((data) => {
          if (!Array.isArray(data)) {
            setBooks([]);
          } else {
            const response = data.map((book) => {
              let hasBook = false;
              let shelfKey = "";
              Object.keys(bookShelves).forEach((key) => {
                const found = bookShelves[key].some(
                  (event) => event.id === book.id
                );
                if (found) {
                  hasBook = true;
                  shelfKey = key;
                  return;
                }
              });

              return hasBook
                ? { ...book, shelf: shelfKey }
                : { ...book, shelf: "none" };
            });
            setBooks(response);
          }
        });
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <Book
                book={book}
                key={index}
                onChangeShelf={onChangeShelf}
              ></Book>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
