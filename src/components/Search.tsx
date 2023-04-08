import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Search({
  word = '',
  placeholder = 'Search...',
  borderColorTailwind = 'border-transparent focus-visible:border-gray peer-focus-visible:border-gray',
}) {
  const [searchValue, setSearchValue] = useState(word);

  function updateSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="search flex h-8 min-w-[70vw] rounded-sm">
      <input
        type="text"
        name="search"
        id="search"
        onChange={updateSearchValue}
        value={searchValue}
        placeholder={placeholder}
        className={`peer flex-1 rounded-l-sm border-2 border-r-0 border-solid p-1 outline-none ${borderColorTailwind}`}
      />
      <Link
        className={`w-8 rounded-r-sm border-2 border-solid bg-light text-dark outline-none hover:bg-dark-highlight hover:text-light ${borderColorTailwind}`}
        to={`/${searchValue}`}
      >
        <button
          className="h-full w-full border-none bg-transparent"
          tabIndex={-1}
        >
          <FontAwesomeIcon icon={faSearch} title="Search" />
        </button>
      </Link>
    </div>
  );
}
