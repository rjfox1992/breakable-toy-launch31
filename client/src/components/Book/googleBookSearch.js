import React, { useState, useEffect } from "react";

import "../../assets/scss/main.scss";

const googleBookForm = (props) => {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);

  const handleInputChange = (event) => {
    setBook(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    getGoogleBooks(book);
    // make a POST fetch request to GoogleBooksRouter
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

  const searchBookTiles = result.map((book) => {
    let imageCheck = <i>No image</i>;
    // debugger;
    if (book.volumeInfo.imageLinks) {
      imageCheck = <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />;
    }

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
      </div>
    );
  });
  const clearResults = () => {
    setResult([]);
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
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3" key={book.id}>
        {searchBookTiles}
      </div>
    </div>
  );
};

export default googleBookForm;
