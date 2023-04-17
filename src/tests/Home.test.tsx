import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { RefObject, createRef } from 'react';

jest.mock(
  '../components/Search',
  () =>
    ({
      resetFocusRef,
      placeholder,
    }: {
      resetFocusRef: RefObject<HTMLElement>;
      placeholder: string;
    }) =>
      <div ref={resetFocusRef as RefObject<HTMLDivElement>}>{placeholder}</div>
);

describe('Home', () => {
  describe('structure', () => {
    it('renders a search bar with the correct placeholder text', () => {
      render(<Home />);
      const searchBar = screen.getByText('Search a word...');
      expect(searchBar).toBeInTheDocument();
    });

    it('renders a search bar with a focus reset ref', () => {
      const ref = createRef<HTMLElement>();
      render(<Home resetFocusRef={ref} />);
      expect(ref.current).not.toBeNull();
    });
  });
});
