import FocusResetProps from '../interfaces/FocusResetProps';
import Search from './Search';

interface HomeProps extends FocusResetProps {}

export default function Home({ resetFocusRef }: HomeProps) {
  return (
    <main className="flex min-h-screen justify-center pt-[35vh]">
      <Search
        placeholder="Search a word..."
        borderTailwind="border-gray border focus-visible:border-dark peer-focus-visible:border-dark"
        resetFocusRef={resetFocusRef}
      />
    </main>
  );
}
