// src/components/NavMenuWebSite/SearchBar.js
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Recherche pour : ${searchTerm}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearchSubmit}>
      
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar__input"
      />
      <CiSearch type="submit" className="search-bar__icon  search-bar__button" />

    </form>
  );
}

export default SearchBar;
