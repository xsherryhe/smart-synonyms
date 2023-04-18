import { render, screen, waitFor, within } from '@testing-library/react';
import fetcher from '../fetcher';

import Glosses from '../components/Glosses';
import Word from '../interfaces/Word';

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
  beforeEach(() => {
    (fetcher as jest.Mock).mockReturnValue({ type: 'success', data: false });
  });

  describe('effects', () => {
    it('calls fetcher with word route using word from params', async () => {
      render(<Glosses />);
      await waitFor(() => expect(fetcher).toHaveBeenCalledWith('words/hello'));
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
      beforeEach(() => {
        const mockWordData: Word = {
          word: 'hello',
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
      });

      it('renders an h1 with the searched word', async () => {
        render(<Glosses />);
        const heading = await screen.findByRole('heading', { level: 1 });

        expect(heading).toHaveTextContent('hello');
      });

      it('renders links for glosses with correct routes to synonym pages', async () => {
        render(<Glosses />);
        const links = await screen.findAllByRole('link');
        const firstLink = links[0];
        expect(firstLink).toHaveAttribute('href', '/hello/n/1/synonyms');
      });

      it('renders buttons for glosses containing definitions and examples', async () => {
        render(<Glosses />);
        const links = await screen.findAllByRole('link');
        const firstLink = links[0];
        const button = within(firstLink).getByRole('button');

        const definition = within(button).getByText('a greeting');
        expect(definition).toBeInTheDocument();

        const example = within(button).getByText('hello there!');
        expect(example).toBeInTheDocument();
      });
    });
  });
});
