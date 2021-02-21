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
        <img src="https://p.kindpng.com/picc/s/196-1965530_open-book-magic-clip-art-hd-png-download.png" />
      </div>
    </div>
  );
};

export default HomePage;
