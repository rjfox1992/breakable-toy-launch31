import React from "react";
import { Link } from "react-router-dom";

const BookTile = ({ book, user }) => {
  return (
    <div className="cell">
      <div className="card text-center Book-tile">
        <Link to={`/books/${book.id}`} />
        <div className="card-divider">
          <h1>{book.title}</h1>
        </div>
        <div className="card-section">
          <h2>{book.author}</h2>
        </div>
      </div>
    </div>
  );
};

export default BookTile;
