import { Link } from 'react-router-dom';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header({ searchWord = '' }) {
  return (
    <header className="flex items-center justify-center gap-4 bg-dark p-2">
      <Link className="flex text-4xl text-light" to="/">
        <FontAwesomeIcon className="" icon={faHouse} />
      </Link>
      <Search word={searchWord} />
    </header>
  );
}
