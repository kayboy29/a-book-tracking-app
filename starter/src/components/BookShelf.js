import Book from "./Book";

const BookShelf = ({ books, shelfTittle, onChangeShelf }) => {
  const shelves = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelves[shelfTittle]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <Book key={index} book={book} onChangeShelf={onChangeShelf}></Book>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
