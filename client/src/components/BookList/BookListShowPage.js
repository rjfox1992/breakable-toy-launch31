import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import BookTile from "../Book/BookTile.js";

const showBooksBookList = (props) => {
  const [books, setBooks] = useState([]);
  const [bookListName, setBookListName] = useState("");
  const [bookFavorites, setBookFavorites] = useState("");
  const bookListId = props.match.params.id;

  const getBooks = async () => {
    try {
      const response = await fetch(`/api/v1/bookLists/${bookListId}`);
      debugger;
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const body = await response.json();
      debugger;
      setBooks(body.bookList.books);
      setBookListName(body.bookList.name);
      debugger;
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const bookList = books.map((book) => {
    debugger;
    return <BookTile key={book.id} book={book} user={props.user} />;
  });

  return (
    <div className="grid-container">
      <h1>{bookListName}</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-2">
        <ul>{bookList}</ul>
      </div>
    </div>
  );
};
export default withRouter(showBooksBookList);
