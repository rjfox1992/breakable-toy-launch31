import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const bookDelete = (props) => {
  const [bookRecord, setBookRecord] = useState({
    title: "",
    author: "",
    imageUrl: "",
    bookList: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { id: bookId } = props.match.params;

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/v1/books/${bookId}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();
      setBookRecord(body.book);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteBook = async (bookPayload) => {
    try {
      const response = await fetch(`/api/v1/books/${bookId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(bookPayload),
      });

      setShouldRedirect(true);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    deleteBook(bookRecord);
  };

  const clearForm = (event) => {
    event.preventDefault();
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to="/books" />;
  }

  return (
    <div>
      <h1>Delete Book {bookRecord.title}</h1>
      <div className="button-group">
        <button className="alert button" onClick={onSubmitHandler}>
          Yes
        </button>
        <button className="button" onClick={clearForm}>
          No
        </button>
      </div>
    </div>
  );
};

export default bookDelete;
