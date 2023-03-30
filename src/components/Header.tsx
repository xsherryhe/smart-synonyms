import { Link } from 'react-router-dom';
import Search from './Search';

export default function Header({ searchWord = '' }) {
  return (
    <>
      <Link to="/">Home</Link>
      <Search word={searchWord} />
    </>
  );
}
