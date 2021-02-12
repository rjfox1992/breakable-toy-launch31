import React, { useState, useEffect } from "react";

import BookTile from "./BookTile.js";

const BookIndex = (props) => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch(`/api/v1/books`);

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const bookData = await response.json();

      setBooks(bookData.books);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const bookItems = books.map((book) => {
    return <BookTile key={book.id} book={book} />;
  });

  return (
    <div className="grid-container">
      <h1 className="header">Books</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">
        <ul>{bookItems}</ul>
      </div>
    </div>
  );
};

export default BookIndex;
