const StatusDropdown = ({ selectedValue, onChangeShelf }) => {
  const handleChangeStatus = (event) => {
    onChangeShelf(event.target.value);
  };

  return (
    <div className="book-shelf-changer">
      <select value={selectedValue} onChange={handleChangeStatus}>
        <option value="" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently reading</option>
        <option value="wantToRead">Want to read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default StatusDropdown;
