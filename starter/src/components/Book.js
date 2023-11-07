const { default: StatusDropdown } = require("./StatusDropDown");

const Book = ({ book, onChangeShelf }) => {
  const handleChangeShelf = (newShelf) => {
    onChangeShelf(book, newShelf);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks?.thumbnail || ""})`,
            }}
          ></div>
          <StatusDropdown
            selectedValue={book.shelf}
            onChangeShelf={handleChangeShelf}
          ></StatusDropdown>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.map((author) => `${author},`)}
        </div>
      </div>
    </li>
  );
};

export default Book;
