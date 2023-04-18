import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header({ searchWord = '' }) {
  return (
    <header className="flex items-center justify-center gap-4 bg-dark p-2">
      <Link
        className="flex rounded-sm border-2 border-solid border-transparent text-3xl text-light outline-none hover:bg-dark-highlight focus-visible:border-gray"
        to="/"
      >
        <FontAwesomeIcon icon={faHouse} title="Home" />
      </Link>
      <Search word={searchWord} />
    </header>
  );
}
