import React from "react";
import GoogleBookSearch from "./../Book/googleBookSearch.js";
const HomePage = () => {
  return (
    <div>
      <div>
        <h2 className=" callout primary text-center welcome-header">
          BookMarked: Organize your Reading
        </h2>
        <div className="grid-container fluid">
          <div key="search-books text-center">
            <GoogleBookSearch />
          </div>
        </div>
        <img src="https://media.istockphoto.com/photos/stack-of-books-picture-id157482029?b=1&k=6&m=157482029&s=170667a&w=0&h=me6shXpmsNsuOOrGvGFNz4ZqeIzMQtC08XWje-68qJo=" />
      </div>
    </div>
  );
};

export default HomePage;
