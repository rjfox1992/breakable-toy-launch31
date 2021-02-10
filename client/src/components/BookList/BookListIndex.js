import React, { useState, useEffect } from "react";
import BookListTile from "./BookListTile.js";

const BookListIndex = (props) => {
  const [bookLists, setBookLists] = useState([]);

  const getBookLists = async () => {
    try {
      const response = await fetch(`/api/v1/bookLists`);

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const bookListData = await response.json();
      setBookLists(bookListData.bookLists);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };
  useEffect(() => {
    getBookLists();
  }, []);
  const bookListItems = bookLists.map((bookList) => {
    return (
      <BookListTile
        key={bookList.id}
        bookList={bookList}
        user={props.user}
        username={props.username}
      />
    );
  });

  return (
    <div className="grid-container">
      <h1 className="header">Booklists</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">{bookListItems}</div>
    </div>
  );
};
export default BookListIndex;
