import { render } from "node-sass";
import React, { useState, useReducer } from "react";

import "../../assets/scss/main.scss";
import AddGoogleBookForm from "./addgoogleBookForm.js";

const googleBookForm = (props) => {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);

  const [bookFormVisibility, setBookFormVisibility] = useState(false);
  const [bookFormRecord, setBookFormRecord] = useState({
    title: "",
    author: "",
    imageUrl: "",
    bookList: "",
  });
  const handleInputChange = (event) => {
    setBook(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    getGoogleBooks(book);
  };

  const getGoogleBooks = async (query) => {
    try {
      const response = await fetch(`/api/v1/googleSearch/?q=${query}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();

      setResult(body.googleBooksResults.items);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const fetchBookData = async (query) => {
    try {
      const response = await fetch(`/api/v1/googleSearch/?q=${query}`);

      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const body = await response.json();

      body.googleBooksResults.items[0];

      if (!body.googleBooksResults.items[0].volumeInfo.imageLinks) {
        imageCheck = "NoImage";
      }
      let title = body.googleBooksResults.items[0].volumeInfo.title;
      let author = body.googleBooksResults.items[0].volumeInfo.authors[0];
      let imageUrl = body.googleBooksResults.items[0].volumeInfo.imageLinks.thumbnail;

      setBookFormRecord({ ...bookFormRecord, title, author, imageUrl, bookList: "" });
      console.log(bookFormRecord);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let showBookForm = undefined;
  const toggleBookForm = () => {
    setBookFormVisibility(!bookFormVisibility);
  };
  if (bookFormVisibility) {
    debugger;
    showBookForm = (
      <div id="form">
        <AddGoogleBookForm
          key={bookFormVisibility}
          bookFormVisibility={bookFormVisibility}
          toggleBookForm={toggleBookForm}
          value={bookFormRecord}
        />
      </div>
    );
    // ReactDOM.render(element, document.getElementById("form"));
  } else showBookForm = undefined;

  const searchBookTiles = result.map((book) => {
    let imageCheck = <i>No image</i>;

    if (book.volumeInfo.imageLinks) {
      imageCheck = <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />;
    }

    const bookFormClick = (event) => {
      event.preventDefault();
      const query = event.currentTarget.value;
      fetchBookData(query);

      toggleBookForm();
    };

    return (
      <div className="cell" key={book.id}>
        <div className="card text-center Book-tile">
          <div className="card-divider">
            <h4 className="book-title">{book.volumeInfo.title}</h4>
          </div>
          <div className="card-section">
            <a target="_blank" href={book.volumeInfo.previewLink}>
              {imageCheck}
            </a>
          </div>
          <div className="card-section">
            <h3>{book.volumeInfo.authors}</h3>
          </div>
        </div>
        <button onClick={bookFormClick} className="button" value={book.id}>
          Add Book
        </button>
      </div>
    );
  });
  const clearResults = () => {
    setResult([]);
    setBookFormVisibility(false);
  };

  return (
    <div className="container text-center">
      <h1>Book Search</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleInputChange}
            className="form-control mt-10"
            placeholder="Search for Books"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="button">
          Search
        </button>
        <button onClick={clearResults} type="reset" className="button">
          Clear Search
        </button>
      </form>
      <div className="showBookForm">{showBookForm}</div>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3" key={book.id}>
        {searchBookTiles}
      </div>
    </div>
  );
};

export default googleBookForm;
