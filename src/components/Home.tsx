import '../styles/Home.css';
import Search from './Search';

export default function Home() {
  return (
    <main className="home flex min-h-screen justify-center pt-[35vh]">
      <Search
        placeholder="Search a word..."
        borderColorTailwind="border-gray focus-visible:border-dark"
      />
    </main>
  );
}
