import '../styles/Home.css';
import Search from './Search';

export default function Home() {
  return (
    <main className="home">
      <Search placeholder="Search a word..." />
    </main>
  );
}
