import React, { useState } from "react";
import "../assets/Pagination.css"; // Import the CSS file

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputValue, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputValue("");
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <form onSubmit={handleSubmit}>
        <input
          className="pagination-input"
          type="number"
          min="1"
          max={totalPages}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="pagination-submit">
          Go
        </button>
      </form>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
