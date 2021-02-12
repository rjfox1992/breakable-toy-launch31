import React from "react";
import { Link } from "react-router-dom";

const BookListTile = ({ bookList, user }) => {
  const divStyle = {
    backgroundImage: `url(${bookList.imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div className="cell">
      <div className="card text-center BookList-tile" style={divStyle}>
        <Link to={`/BookLists/${bookList.id}`}>
          <div className="BookList-name">{bookList.name}</div>
        </Link>
      </div>
    </div>
  );
};

export default BookListTile;
