import "./App.css";
import SearchPage from "./SearchPage";
import ShelfList from "./ShelfList";
import { useState, useEffect } from "react";
import { getAll, update } from "./BooksAPI";
import { Routes, Route } from "react-router-dom";

function App() {
  const [bookShelves, setBookShelves] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
  });

  useEffect(() => {
    getAll()
      .then((data) => {
        const result = data.reduce((group, arr) => {
          const { shelf } = arr;
          group[shelf] = group[shelf];
          group[shelf].push(arr);
          return group;
        }, {});
        setBookShelves((prev) => ({ ...prev, ...result }));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeShelf = (book, newShelf) => {
    update(book, newShelf).then(() => {
      const currentShelf = bookShelves[book.shelf].filter(
        (b) => b.id !== book.id
      );
      const oldShelf = book.shelf;
      book.shelf = newShelf;
      const newBookShelf = [...bookShelves[newShelf], book];

      setBookShelves((prev) => ({
        ...prev,
        [oldShelf]: currentShelf,
        [newShelf]: newBookShelf,
      }));
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ShelfList
              bookShelves={bookShelves}
              onChangeShelf={handleChangeShelf}
            ></ShelfList>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <SearchPage
              bookShelves={bookShelves}
              onChangeShelf={handleChangeShelf}
            ></SearchPage>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
