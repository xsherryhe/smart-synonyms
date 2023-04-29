import { useEffect, useState, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusResetProps from '../interfaces/FocusResetProps';
import { displayInput, sanitizeInput } from '../utilities';

interface SearchProps extends FocusResetProps {
  word?: string;
  placeholder?: string;
  borderTailwind?: string;
}

export default function Search({
  word = '',
  placeholder = 'Search...',
  borderTailwind = 'border-transparent border focus-visible:border-gray peer-focus-visible:border-gray',
  resetFocusRef,
}: SearchProps) {
  const displayWord = displayInput(word);
  const [searchValue, setSearchValue] = useState(displayWord);

  useEffect(() => {
    if (resetFocusRef?.current) resetFocusRef.current.focus();
  }, [resetFocusRef]);

  function updateSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="search flex h-8 min-w-[75vw] rounded-sm">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        name="search"
        id="search"
        onChange={updateSearchValue}
        value={searchValue}
        placeholder={placeholder}
        maxLength={30}
        tabIndex={-1}
        ref={resetFocusRef as RefObject<HTMLInputElement> | undefined}
        className={`peer flex-1 rounded-l-sm border-r-0 border-solid p-1 outline-none ${borderTailwind}`}
      />
      <Link
        className={`w-8 rounded-r-sm bg-light text-dark hover:bg-dark-highlight hover:text-light ${borderTailwind}`}
        to={`/${sanitizeInput(searchValue)}`}
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
