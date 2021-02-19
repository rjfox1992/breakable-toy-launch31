import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "../ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";

const BookListForm = (props) => {
  const [bookListRecord, setBookListRecord] = useState({
    name: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const addBookList = async (newBookListData) => {
    try {
      const response = await fetch(`/api/v1/bookLists`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newBookListData),
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

  if (shouldRedirect) {
    return <Redirect to="/bookLists" />;
  }

  const handleInputChange = (event) => {
    setBookListRecord({
      ...bookListRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const fieldReset = () => {
    setBookListRecord({
      name: "",
      imageUrl: "",
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addBookList(bookListRecord);
    fieldReset();
  };

  const clearForm = (event) => {
    event.preventDefault();
    fieldReset();
  };

  return (
    <div className="card" id="new-bookList-form">
      <h1>Add a New BookList</h1>
      <div className="card-divider text-center">
        <ErrorList errors={errors} />
        <form className="callout small" onSubmit={onSubmitHandler}>
          <label htmlFor="name">BookList Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={bookListRecord.name || ""}
          />

          <label htmlFor="imageUrl">Booklist ImageUrl:</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={handleInputChange}
            value={bookListRecord.imageUrl || ""}
          />

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
export default BookListForm;
