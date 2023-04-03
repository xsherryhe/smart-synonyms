import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Search.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Search({ word = '', placeholder = 'Search...' }) {
  const [searchValue, setSearchValue] = useState(word);

  function updateSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="search">
      <input
        type="text"
        name="search"
        id="search"
        onChange={updateSearchValue}
        value={searchValue}
        placeholder={placeholder}
        className="search-input"
      />
      <Link to={`/${searchValue}`}>
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} title="Search" />
        </button>
      </Link>
    </div>
  );
}
