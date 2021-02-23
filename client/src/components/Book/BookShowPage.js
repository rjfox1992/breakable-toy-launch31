import BookTile from "./BookTile";
import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

const BookShowPage = (props) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    imageUrl: "",
    bookList: "",
    userId: "",
  });
  const [currentUser, setCurrentUser] = useState({
    currentUser: "",
  });
  const { id: bookId } = props.match.params;

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/v1/books/${bookId}`);

      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();

      setBook(body.book);
      setCurrentUser(body.currentUserId);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  let editDeleteButtons = "";

  if (currentUser === book.userId) {
    editDeleteButtons = (
      <div>
        <Link to={`/books/${book.id}/delete`} className="button">
          Delete
        </Link>
      </div>
    );
  }

  return (
    <div className="book-showPage centered">
      <BookTile key={bookId} book={book} user={currentUser} />
      {editDeleteButtons}
    </div>
  );
};

export default withRouter(BookShowPage);
