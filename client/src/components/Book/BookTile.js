import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookTile = ({ book }) => {
  return (
    <div className="cell">
      <div className="card text-center Book-tile">
        <div className="card-divider">
          <h1>{book.title}</h1>
        </div>
        <div className="card-section">
          <Link to={`/books/${book.id}`}>
            <img className="tile-Image" src={book.imageUrl} />
          </Link>
        </div>
        <div className="card-section">
          <h2>{book.author}</h2>
        </div>
      </div>
    </div>
  );
};

export default BookTile;
