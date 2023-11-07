import BookShelf from "./components/BookShelf";
import { Link } from "react-router-dom";

const ShelfList = ({ bookShelves, onChangeShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(bookShelves).map(
            (key) =>
              key !== "none" && (
                <BookShelf
                  key={key}
                  books={bookShelves[key]}
                  shelfTittle={key}
                  onChangeShelf={onChangeShelf}
                ></BookShelf>
              )
          )}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default ShelfList;
