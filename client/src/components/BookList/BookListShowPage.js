import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import BookTile from "../Book/BookTile.js";

const showBooksBookList = (props) => {
  const [books, setBooks] = useState([]);
  const [bookListName, setBookListName] = useState("");
  const [bookLists, setBookLists] = useState([]);
  const bookListId = props.match.params.id;

  const getBookListName = async () => {
    try {
      const response = await fetch(`/api/v1/bookLists/${bookListId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const bookListData = await response.json();
      setBookListName(bookListData.bookList.name);
      setBooks(bookListData.bookList.books);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getBookListName();
  }, []);

  const bookTiles = books.map((book) => {
    {
      return <BookTile key={book.id} book={book} user={props.user} bookListId={book.bookListId} />;
    }
  });

  return (
    <div className="grid-container">
      <h1>{bookListName}</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-2">
        <ul>{bookTiles}</ul>
      </div>
    </div>
  );
};
export default withRouter(showBooksBookList);
