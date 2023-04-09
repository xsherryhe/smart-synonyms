import Search from './Search';

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center pt-[35vh]">
      <Search
        placeholder="Search a word..."
        borderTailwind="border-gray border focus-visible:border-dark peer-focus-visible:border-dark"
      />
    </main>
  );
}
