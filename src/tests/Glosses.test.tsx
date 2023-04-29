import { render, screen, waitFor, within } from '@testing-library/react';
import fetcher from '../fetcher';

import Glosses from '../components/Glosses';
import Word from '../interfaces/Word';
import { createRef } from 'react';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ word: 'hello' }),
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('../fetcher');

jest.mock(
  '../components/Header',
  () =>
    ({ searchWord }: { searchWord: string }) =>
      <header>{searchWord}</header>
);

describe('Glosses', () => {
  function mockWordDataReturnValue() {
    const mockWordData: Word = {
      word: 'hello!',
      glosses: [
        {
          id: '1',
          pos: 'n',
          synsets: [
            {
              pos_offset: 1,
              words: ['hello'],
              definition: 'a greeting',
              examples: ['hello there!'],
            },
          ],
        },
      ],
    };

    (fetcher as jest.Mock).mockReturnValue({
      type: 'success',
      data: mockWordData,
    });
  }

  beforeEach(() => {
    (fetcher as jest.Mock).mockReturnValue({ type: 'success', data: false });
  });

  describe('effects', () => {
    it('calls fetcher with word route using word from params', async () => {
      render(<Glosses />);
      await waitFor(() => expect(fetcher).toHaveBeenCalledWith('words/hello'));
    });

    describe('if reset focus ref is passed in', () => {
      describe('when fetcher returns data of false', () => {
        it('resets focus to "Word not found" message', async () => {
          const ref = createRef<HTMLElement>();
          render(<Glosses resetFocusRef={ref} />);

          const wordNotFound = await screen.findByText(/word not found/i);
          await waitFor(() => expect(wordNotFound).toHaveFocus());
        });
      });

      describe('when fetcher returns word data', () => {
        beforeEach(mockWordDataReturnValue);
        it('resets focus to the h1 with the searched word', async () => {
          const ref = createRef<HTMLElement>();
          render(<Glosses resetFocusRef={ref} />);

          const heading = await screen.findByRole('heading', { level: 1 });
          await waitFor(() => expect(heading).toHaveFocus());
        });
      });
    });
  });

  describe('structure', () => {
    it('renders a header with the searched word passed in', async () => {
      render(<Glosses />);
      await waitFor(() => expect(fetcher).toHaveBeenCalled());

      const header = screen.getByRole('banner');
      expect(header).toHaveTextContent('hello');
    });

    describe('when fetcher returns data of false', () => {
      it('renders a "Word not found" message', async () => {
        render(<Glosses />);

        const wordNotFound = await screen.findByText(/word not found/i);
        expect(wordNotFound).toBeInTheDocument();
      });
    });

    describe('when fetcher returns word data', () => {
      beforeEach(mockWordDataReturnValue);

      it('renders an h1 with the found word', async () => {
        render(<Glosses />);
        const heading = await screen.findByRole('heading', { level: 1 });

        expect(heading).toHaveTextContent('hello!');
      });

      it('renders links with buttons for glosses containing definitions and examples', async () => {
        render(<Glosses />);
        const links = await screen.findAllByRole('link');
        const firstLink = links[0];
        const button = within(firstLink).getByRole('button');

        const definition = within(button).getByText('a greeting');
        expect(definition).toBeInTheDocument();

        const example = within(button).getByText('hello there!');
        expect(example).toBeInTheDocument();
      });

      it('renders links for glosses with correct routes to synonym pages', async () => {
        render(<Glosses />);
        const links = await screen.findAllByRole('link');
        const firstLink = links[0];
        expect(firstLink).toHaveAttribute('href', '/hello/n/1/synonyms');
      });
    });
  });
});
