import React from "react";
import { Link } from "react-router-dom";

const BookTile = ({ book, user }) => {
  return (
    <div className="cell">
      <div className="card text-center Book-tile">
        <Link to={`/userBookList/${book.id}`}>
          <div className="BookList-name">{book.name}</div>
        </Link>
      </div>
    </div>
  );
};

export default BookTile;
