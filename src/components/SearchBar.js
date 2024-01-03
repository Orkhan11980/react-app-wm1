import React from 'react';
import '../styles/searchBar.css';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search flashcards..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="search-button">
            🔍
          </button>
        </div>
  );
};

export default SearchBar;