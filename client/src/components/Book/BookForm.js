import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "../ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";

const BookForm = (props) => {
  const [bookRecord, setBookRecord] = useState({
    title: "",
    author: "",
    imageUrl: "",
    bookList: "",
  });
  const [bookLists, setBookLists] = useState([]);
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const fetchBookLists = async () => {
    try {
      const response = await fetch(`/api/v1/bookLists`);

      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }

      const body = await response.json();
      setBookLists([{ name: "", id: "" }, ...body.bookLists]);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const addBook = async (bookPayload) => {
    try {
      const response = await fetch(`/api/v1/books`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(bookPayload),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setErrors([]);
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchBookLists();
    if (shouldRedirect) {
      return <Redirect to="/books" />;
    }
  }, []);

  const availableBookLists = bookLists.map((bookList) => {
    return (
      <option key={bookList.id} value={bookList.id}>
        {bookList.name}
      </option>
    );
  });
  const handleInputChange = (event) => {
    setBookRecord({
      ...bookRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const fieldReset = () => {
    setBookRecord({
      name: "",
      description: "",
      bookListsId: "",
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addBook(bookRecord);
    fieldReset();
  };

  const clearForm = (event) => {
    event.preventDefault();
    fieldReset();
  };

  return (
    <div className="card" id="new-book-form">
      <h1>Add a New Book</h1>
      <div className="card-divider text-center">
        <ErrorList errors={errors} />
        <form className="callout small" onSubmit={onSubmitHandler}>
          <label htmlFor="name">Book Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={bookRecord.title || ""}
          />

          <label htmlFor="author">Book Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={handleInputChange}
            value={bookRecord.author || ""}
          />

          <label htmlFor="imageUrl">Book Thumbnail:</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={handleInputChange}
            value={bookRecord.imageUrl || ""}
          />

          <label htmlFor="bookListsId">BookLists:</label>
          <select
            name="bookListsId"
            onChange={handleInputChange}
            value={bookRecord.bookListsId || ""}
          >
            {availableBookLists}
          </select>
          <div className="button-group">
            <button className="button" onClick={clearForm}>
              Clear
            </button>
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookForm;
