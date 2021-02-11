import React from "react";
import { Link } from "react-router-dom";

const BookTile = ({ book, user }) => {
  return (
    // <div className="cell">
    //   <div className="card text-center Book-tile">
    <div className="BookList-name">
      <h1>{book.name}</h1>
    </div>
    //   </div>
    // </div>
  );
};

export default BookTile;
