import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  function updateSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        name="search"
        id="search"
        onChange={updateSearchValue}
        value={searchValue}
      />
      <Link to={`/${searchValue}`}>
        <button>Search</button>
      </Link>
    </>
  );
}
